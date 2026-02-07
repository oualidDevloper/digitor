"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        products: 0,
        orders: 0,
        revenue: 0
    });

    useEffect(() => {
        async function fetchStats() {
            // Get products count
            const { count: productsCount } = await supabase
                .from("products")
                .select("*", { count: 'exact', head: true });

            // Get orders count and revenue (sum total_amount)
            const { data: orders } = await supabase
                .from("orders")
                .select("total_amount")
                .eq("status", "completed");

            const revenue = orders?.reduce((acc, order) => acc + order.total_amount, 0) || 0;
            const ordersCount = orders?.length || 0;

            setStats({
                products: productsCount || 0,
                orders: ordersCount,
                revenue
            });
        }

        fetchStats();
    }, []);

    return (
        <div className="fade-in">
            <h2 className="section-title" style={{ fontSize: "2rem", marginBottom: "2rem" }}>Aperçu de l'activité</h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
                <div className="admin-card glass" style={{ textAlign: "center" }}>
                    <span style={{ fontSize: "0.9rem", color: "hsl(var(--text-dim))", fontWeight: 600 }}>Produits Actifs</span>
                    <div style={{ fontSize: "2.5rem", fontWeight: 800, margin: "0.5rem 0" }}>{stats.products}</div>
                    <div style={{ fontSize: "0.85rem", color: "hsl(var(--accent-primary))" }}>En vente actuellement</div>
                </div>

                <div className="admin-card glass" style={{ textAlign: "center" }}>
                    <span style={{ fontSize: "0.9rem", color: "hsl(var(--text-dim))", fontWeight: 600 }}>Ventes Totales</span>
                    <div style={{ fontSize: "2.5rem", fontWeight: 800, margin: "0.5rem 0" }}>{stats.orders}</div>
                    <div style={{ fontSize: "0.85rem", color: "hsl(var(--accent-primary))" }}>Commandes validées</div>
                </div>

                <div className="admin-card glass" style={{ textAlign: "center" }}>
                    <span style={{ fontSize: "0.9rem", color: "hsl(var(--text-dim))", fontWeight: 600 }}>Chiffre d'Affaire</span>
                    <div style={{ fontSize: "2.5rem", fontWeight: 800, margin: "0.5rem 0", color: "hsl(var(--accent-primary))" }}>{stats.revenue}€</div>
                    <div style={{ fontSize: "0.85rem", color: "hsl(var(--text-dim))" }}>Généré depuis le lancement</div>
                </div>
            </div>

            <div className="admin-card glass" style={{ marginTop: "3rem" }}>
                <h3 style={{ marginBottom: "1.5rem" }}>Bienvenue dans votre gestionnaire Digitor</h3>
                <p style={{ color: "hsl(var(--text-secondary))", lineHeight: "1.6" }}>
                    Utilisez le menu latéral pour gérer vos produits digitaux, consulter vos commandes et suivre l'évolution de votre boutique.
                    Toutes les modifications prennent effet immédiatement sur le site public.
                </p>
            </div>
        </div>
    );
}
