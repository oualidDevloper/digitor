"use client";

import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";

export default function CheckoutButton() {
    const { cart, totalPrice } = useCart();

    const handleCheckout = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: cart,
                    userId: session?.user?.id,
                }),
            });

            const { id, error } = await response.json();

            if (error) {
                alert(error);
                return;
            }

            // Re-route to Stripe Checkout
            const stripe = (await import('@stripe/stripe-js')).loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
            (await stripe)?.redirectToCheckout({ sessionId: id });

        } catch (err) {
            console.error('Checkout error:', err);
            alert('Une erreur est survenue lors de l\'initialisation du paiement.');
        }
    };

    return (
        <button
            className="checkout-btn"
            disabled={cart.length === 0}
            onClick={handleCheckout}
        >
            Commander ({totalPrice}€)
        </button>
    );
}
