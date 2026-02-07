import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import { resend } from '@/lib/email';
import { OrderEmail } from '@/emails/OrderEmail';
import { headers } from 'next/headers';

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get('stripe-signature') as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as any;

        const userId = session.metadata.userId;
        const productIds = JSON.parse(session.metadata.productIds);
        const totalAmount = session.amount_total / 100;

        try {
            // 1. Create the order
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert([
                    {
                        user_id: userId === 'guest' ? null : userId,
                        total_amount: totalAmount,
                        status: 'completed',
                        stripe_payment_id: session.payment_intent as string,
                    },
                ])
                .select()
                .single();

            if (orderError) throw orderError;

            // 2. Create order items
            const orderItems = productIds.map((productId: string) => ({
                order_id: order.id,
                product_id: productId,
                price_at_purchase: 0, // In a real app, you'd fetch the current price or get it from session
            }));

            // Fetch prices for items to be accurate (Optional but recommended)
            const { data: products } = await supabase
                .from('products')
                .select('id, price, title, file_url')
                .in('id', productIds);

            const itemsWithPrices = orderItems.map((item: any) => {
                const product = products?.find(p => p.id === item.product_id);
                return {
                    ...item,
                    price_at_purchase: product?.price || 0,
                };
            });

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(itemsWithPrices);

            if (itemsError) throw itemsError;

            // 3. Send confirmation email
            const customerEmail = session.customer_details?.email;
            const customerName = session.customer_details?.name || 'Client';

            if (customerEmail) {
                try {
                    await resend.emails.send({
                        from: 'Digitor <onboarding@resend.dev>', // Update with your domain once verified
                        to: customerEmail,
                        subject: `Votre commande Digitor #${order.id.slice(0, 8)}`,
                        react: OrderEmail({
                            customerName,
                            orderId: order.id,
                            totalAmount,
                            products: products?.map(p => ({
                                title: p.title,
                                price: p.price,
                                downloadUrl: p.file_url,
                            })) || [],
                        }),
                    });
                } catch (emailErr) {
                    console.error('Email failed but order succeeded:', emailErr);
                }
            }

            console.log(`Order ${order.id} processed successfully and email sent to ${customerEmail}`);

        } catch (err: any) {
            console.error('Error processing order in webhook:', err.message);
            return NextResponse.json({ error: 'Order processing failed' }, { status: 500 });
        }
    }

    return NextResponse.json({ received: true });
}
