export type Profile = {
    id: string;
    full_name: string | null;
    email: string;
    is_admin: boolean;
    created_at: string;
};

export type Product = {
    id: string;
    title: string;
    description: string;
    price: number;
    image_url: string;
    file_url: string;
    category: string;
    format: string;
    featured: boolean;
    created_at: string;
};

export type Order = {
    id: string;
    user_id: string;
    total_amount: number;
    status: 'pending' | 'completed' | 'failed';
    stripe_payment_id: string | null;
    created_at: string;
};

export type OrderItem = {
    id: string;
    order_id: string;
    product_id: string;
    price_at_purchase: number;
};
