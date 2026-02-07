"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Order, OrderItem, Product } from "@/lib/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./dashboard.module.css";

type OrderWithItems = Order & {
    order_items: (OrderItem & { products: Product })[];
};

export default function DashboardPage() {
    const [orders, setOrders] = useState<OrderWithItems[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchUserOrders() {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                router.push("/login");
                return;
            }

            const { data, error } = await supabase
                .from("orders")
                .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
                .eq("user_id", session.user.id)
                .order("created_at", { ascending: false });

            if (!error) {
                setOrders(data as OrderWithItems[]);
            }
            setLoading(false);
        }

        fetchUserOrders();
    }, [router]);

    if (loading) {
        return (
            <div className="container" style={{ paddingTop: "140px", textAlign: "center" }}>
                <p>Chargement de vos commandes...</p>
            </div>
        );
    }

    return (
        <div className="fade-in" style={{ paddingTop: "120px", minHeight: "80vh" }}>
            <div className="container">
                <header style={{ marginBottom: "3rem" }}>
                    <h1 className="section-title">Mon Espace</h1>
                    <p className="section-subtitle">Gérez vos achats et téléchargez vos produits</p>
                </header>

                <div className={styles.dashboardGrid}>
                    <section className={styles.ordersSection}>
                        <h2 style={{ marginBottom: "1.5rem", fontSize: "1.5rem" }}>Mes Téléchargements</h2>

                        {orders.length === 0 ? (
                            <div className="glass" style={{ padding: "3rem", textAlign: "center", borderRadius: "20px" }}>
                                <p style={{ color: "hsl(var(--text-dim))" }}>Vous n'avez pas encore effectué d'achat.</p>
                                <Link href="/catalog" className="gradient-text" style={{ fontWeight: 600, marginTop: "1rem", display: "inline-block" }}>
                                    Parcourir le catalogue →
                                </Link>
                            </div>
                        ) : (
                            <div className={styles.orderList}>
                                {orders.map(order => (
                                    <div key={order.id} className={`${styles.orderCard} glass`}>
                                        <div className={styles.orderHeader}>
                                            <div>
                                                <span className={styles.orderDate}>
                                                    {new Date(order.created_at).toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </span>
                                                <span className={styles.orderId}>Commande #{order.id.slice(0, 8)}</span>
                                            </div>
                                            <span className={styles.orderStatus}>{order.status === 'completed' ? 'Validée' : 'En attente'}</span>
                                        </div>

                                        <div className={styles.itemsList}>
                                            {order.order_items.map(item => (
                                                <div key={item.id} className={styles.itemRow}>
                                                    <div className={styles.itemInfo}>
                                                        <div className={styles.itemImage}>
                                                            <Image src={item.products.image_url} alt={item.products.title} fill style={{ objectFit: 'cover' }} />
                                                        </div>
                                                        <div>
                                                            <h3 className={styles.itemTitle}>{item.products.title}</h3>
                                                            <span className={styles.itemCategory}>{item.products.category} • {item.products.format}</span>
                                                        </div>
                                                    </div>
                                                    <a
                                                        href={item.products.file_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={styles.downloadBtn}
                                                    >
                                                        Télécharger
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    <aside className={styles.profileAside}>
                        <div className="glass" style={{ padding: "2rem", borderRadius: "24px" }}>
                            <h3 style={{ marginBottom: "1rem" }}>Aide & Support</h3>
                            <p style={{ fontSize: "0.9rem", color: "hsl(var(--text-secondary))", lineHeight: "1.5", marginBottom: "1.5rem" }}>
                                Un problème avec votre téléchargement ? Notre équipe est là pour vous aider.
                            </p>
                            <Link href="/faq" className="btn secondary" style={{ width: "100%", textAlign: "center" }}>FAQ</Link>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
