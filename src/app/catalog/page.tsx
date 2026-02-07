"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/lib/supabase";
import { Product } from "@/lib/types";
import styles from "./catalog.module.css";

export default function CatalogPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function fetchProducts() {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching products:", error);
            } else {
                setProducts(data || []);
            }
            setLoading(false);
        }

        fetchProducts();
    }, []);

    const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

    const filteredProducts = products.filter(p => {
        const matchesFilter = filter === "All" || p.category === filter;
        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (loading) {
        return (
            <div className="container" style={{ paddingTop: "140px", textAlign: "center" }}>
                <p>Chargement du catalogue...</p>
            </div>
        );
    }

    return (
        <div className="fade-in" style={{ paddingTop: "120px" }}>
            <div className="container">
                <div className={styles.header}>
                    <h1 className="section-title">Notre Catalogue</h1>
                    <p className="section-subtitle">Explorez tous nos produits digitaux premium</p>
                </div>

                <div className={styles.controls}>
                    <div className={styles.searchBar}>
                        <input
                            type="text"
                            placeholder="Rechercher un produit..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="glass"
                        />
                    </div>

                    <div className={styles.filters}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`${styles.filterBtn} ${filter === cat ? styles.active : ""} glass`}
                                onClick={() => setFilter(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.grid}>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                price={product.price}
                                image={product.image_url}
                                category={product.category}
                                format={product.format}
                            />
                        ))
                    ) : (
                        <div className={styles.noResults}>
                            <p>Aucun produit ne correspond à votre recherche.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
