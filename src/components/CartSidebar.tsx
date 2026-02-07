"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import CheckoutButton from "./CheckoutButton";
import "./CartSidebar.css";

export default function CartSidebar() {
    const { cart, removeFromCart, isCartOpen, setCartOpen, totalPrice, totalItems } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
            <div className="cart-sidebar glass" onClick={(e) => e.stopPropagation()}>
                <div className="cart-header">
                    <h2>Votre Panier ({totalItems})</h2>
                    <button className="close-btn" onClick={() => setCartOpen(false)}>&times;</button>
                </div>

                <div className="cart-items">
                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <p>Votre panier est vide.</p>
                        </div>
                    ) : (
                        cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="item-image">
                                    <Image src={item.image} alt={item.title} width={80} height={50} className="rounded" />
                                </div>
                                <div className="item-info">
                                    <h4>{item.title}</h4>
                                    <p>{item.price}€</p>
                                </div>
                                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑️</button>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-footer">
                    <CheckoutButton />
                </div>
            </div>
        </div>
    );
}
