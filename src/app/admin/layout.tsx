"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import "./admin.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function checkAdmin() {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                router.push("/login");
                return;
            }

            // Check if user is admin in the profiles table
            const { data: profile, error } = await supabase
                .from("profiles")
                .select("is_admin")
                .eq("id", session.user.id)
                .single();

            if (error || !profile?.is_admin) {
                router.push("/"); // Not an admin
            } else {
                setIsAdmin(true);
            }
            setLoading(false);
        }

        checkAdmin();
    }, [router]);

    if (loading) return <div className="admin-loading">Vérification des accès...</div>;
    if (!isAdmin) return null;

    return (
        <div className="admin-container">
            <aside className="admin-sidebar glass">
                <div className="admin-logo">
                    <span className="gradient-text">Digitor Admin</span>
                </div>
                <nav className="admin-nav">
                    <Link href="/admin" className="admin-nav-link">Tableau de bord</Link>
                    <Link href="/admin/products" className="admin-nav-link">Gestion Produits</Link>
                    <Link href="/admin/orders" className="admin-nav-link">Commandes</Link>
                    <hr className="nav-divider" />
                    <Link href="/" className="admin-nav-link secondary">Retour au site</Link>
                </nav>
            </aside>

            <main className="admin-main">
                <header className="admin-header glass">
                    <h1>Espace Administration</h1>
                    <div className="admin-user">Admin Mode</div>
                </header>
                <div className="admin-content">
                    {children}
                </div>
            </main>
        </div>
    );
}
