"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "./form.module.css";

export default function NewProductPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.from("products").insert([
            {
                ...formData,
                price: parseFloat(formData.price),
            },
        ]);

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

    return (
        <div className="fade-in">
            <h2 className="section-title" style={{ fontSize: "2rem", marginBottom: "2rem" }}>Ajouter un Produit</h2>

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
                            {loading ? "Création..." : "Enregistrer le produit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
