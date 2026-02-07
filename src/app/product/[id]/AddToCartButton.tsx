"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";
import styles from "./product.module.css";

export default function AddToCartButton({ product }: { product: Product }) {
    const { addToCart } = useCart();

    return (
        <button className={styles.addToCartBtn} onClick={() => addToCart(product)}>
            Ajouter au panier
        </button>
    );
}
