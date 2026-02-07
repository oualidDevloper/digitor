"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import "./Header.css";

export default function Header() {
    const { totalItems, setCartOpen } = useCart();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser(session?.user ?? null);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    return (
        <header className="header glass">
            <div className="container header-content">
                <Link href="/" className="logo-link">
                    <span className="logo-text gradient-text">Digitor</span>
                </Link>
                <nav className="nav">
                    <Link href="/catalog" className="nav-link">Catalogue</Link>
                    <Link href="/about" className="nav-link">À propos</Link>
                    <Link href="/faq" className="nav-link">FAQ</Link>
                </nav>
                <div className="header-actions">
                    <button className="cart-btn" onClick={() => setCartOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        🛒 <span className="cart-count">{totalItems}</span>
                    </button>
                    {user ? (
                        <div className="user-menu">
                            <Link href="/dashboard" className="nav-link" style={{ marginRight: '1rem' }}>Mes Téléchargements</Link>
                            <span className="user-name">{user.user_metadata.full_name || user.email}</span>
                            <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
                        </div>
                    ) : (
                        <Link href="/login" className="login-btn">Connexion</Link>
                    )}
                </div>
            </div>
        </header>
    );
}
