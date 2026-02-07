import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const { items, userId } = await req.json();

        if (!items || items.length === 0) {
            return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
        }

        // Create Stripe checkout session
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

        if (!siteUrl) {
            console.error('CRITICAL: NEXT_PUBLIC_SITE_URL is missing in environment variables');
            return NextResponse.json({ error: 'Configuration Error: Site URL is missing.' }, { status: 500 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map((item: any) => {
                const imageUrl = item.image_url || item.image || '';
                const absoluteImageUrl = imageUrl.startsWith('http')
                    ? imageUrl
                    : `${siteUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;

                return {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: item.title,
                            images: absoluteImageUrl ? [absoluteImageUrl] : [],
                        },
                        unit_amount: Math.round(item.price * 100),
                    },
                    quantity: item.quantity,
                };
            }),
            mode: 'payment',
            success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${siteUrl}/cart`,
            metadata: {
                userId: userId || 'guest',
                productIds: JSON.stringify(items.map((item: any) => item.id)),
            },
        });

        return NextResponse.json({ id: session.id });
    } catch (err: any) {
        console.error('Stripe error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
