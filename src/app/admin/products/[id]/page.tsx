"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "../new/form.module.css";

export default function EditProductPage() {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const router = useRouter();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "Formation Vidéo",
        format: "",
        image_url: "",
        file_url: "",
        featured: false
    });

    useEffect(() => {
        async function fetchProduct() {
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .eq("id", id)
                .single();

            if (error) {
                alert("Produit non trouvé");
                router.push("/admin/products");
            } else {
                setFormData({
                    title: data.title,
                    description: data.description,
                    price: data.price.toString(),
                    category: data.category,
                    format: data.format,
                    image_url: data.image_url,
                    file_url: data.file_url,
                    featured: data.featured
                });
            }
            setFetching(false);
        }

        fetchProduct();
    }, [id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from("products")
            .update({
                ...formData,
                price: parseFloat(formData.price),
            })
            .eq("id", id);

        if (error) {
            alert("Erreur: " + error.message);
            setLoading(false);
        } else {
            router.push("/admin/products");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

        setFormData(prev => ({
            ...prev,
            [name]: val
        }));
    };

    if (fetching) return <div className="admin-loading">Chargement du produit...</div>;

    return (
        <div className="fade-in">
            <h2 className="section-title" style={{ fontSize: "2rem", marginBottom: "2rem" }}>Modifier le Produit</h2>

            <div className="admin-card glass">
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.grid}>
                        <div className={styles.field}>
                            <label>Titre du produit</label>
                            <input name="title" value={formData.title} onChange={handleChange} required className="glass" />
                        </div>

                        <div className={styles.field}>
                            <label>Catégorie</label>
                            <select name="category" value={formData.category} onChange={handleChange} className="glass">
                                <option>Formation Vidéo</option>
                                <option>Livre Numérique</option>
                                <option>Logiciel</option>
                                <option>Template / Asset</option>
                            </select>
                        </div>

                        <div className={styles.field}>
                            <label>Prix (€)</label>
                            <input name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required className="glass" />
                        </div>

                        <div className={styles.field}>
                            <label>Format (ex: PDF, MP4...)</label>
                            <input name="format" value={formData.format} onChange={handleChange} required className="glass" />
                        </div>

                        <div className={styles.field} style={{ gridColumn: "1 / -1" }}>
                            <label>Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows={5} className="glass" />
                        </div>

                        <div className={styles.field}>
                            <label>URL Image Couverture</label>
                            <input name="image_url" value={formData.image_url} onChange={handleChange} required className="glass" />
                        </div>

                        <div className={styles.field}>
                            <label>URL Fichier Digital (Reference)</label>
                            <input name="file_url" value={formData.file_url} onChange={handleChange} required className="glass" />
                        </div>

                        <div className={styles.field} style={{ flexDirection: "row", alignItems: "center", gap: "1rem" }}>
                            <input name="featured" type="checkbox" checked={formData.featured} onChange={handleChange} style={{ width: "auto" }} />
                            <label>Mettre en avant sur l'accueil</label>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button type="button" onClick={() => router.back()} className="admin-btn secondary">Annuler</button>
                        <button type="submit" disabled={loading} className="admin-btn primary">
                            {loading ? "Enregistrement..." : "Mettre à jour le produit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
