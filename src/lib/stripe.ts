import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    // @ts-ignore - Fixing exact version mismatch for Vercel build
    apiVersion: '2026-01-28.clover',
    appInfo: {
        name: 'Digitor',
        version: '0.1.0',
    },
});
