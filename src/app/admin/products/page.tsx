"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Product } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error) setProducts(data || []);
        setLoading(false);
    }

    async function deleteProduct(id: string) {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return;

        const { error } = await supabase.from("products").delete().eq("id", id);
        if (!error) {
            setProducts(products.filter(p => p.id !== id));
        } else {
            alert("Erreur lors de la suppression");
        }
    }

    return (
        <div className="fade-in">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h2 className="section-title" style={{ fontSize: "2rem", margin: 0 }}>Gestion des Produits</h2>
                <Link href="/admin/products/new" className="admin-btn primary">
                    + Nouveau Produit
                </Link>
            </div>

            <div className="admin-card glass">
                {loading ? (
                    <p>Chargement...</p>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Produit</th>
                                <th>Catégorie</th>
                                <th>Prix</th>
                                <th>Format</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                        <div style={{ position: "relative", width: "50px", height: "35px", borderRadius: "4px", overflow: "hidden" }}>
                                            <Image src={product.image_url} alt={product.title} fill style={{ objectFit: "cover" }} />
                                        </div>
                                        <strong>{product.title}</strong>
                                    </td>
                                    <td>{product.category}</td>
                                    <td>{product.price}€</td>
                                    <td>{product.format}</td>
                                    <td style={{ display: "flex", gap: "0.5rem" }}>
                                        <Link href={`/admin/products/${product.id}`} className="admin-btn secondary" style={{ padding: "6px 12px" }}>Edit</Link>
                                        <button onClick={() => deleteProduct(product.id)} className="admin-btn danger" style={{ padding: "6px 12px" }}>Suppr</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
