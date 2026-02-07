"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import styles from "./auth.module.css";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push("/");
            router.refresh();
        }
    };

    return (
        <div className="fade-in" style={{ paddingTop: "140px", minHeight: "80vh", display: "flex", alignItems: "center" }}>
            <div className="container" style={{ maxWidth: "450px" }}>
                <div className={`${styles.authCard} glass`}>
                    <h1 className="gradient-text" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Connexion</h1>
                    <p style={{ color: "hsl(var(--text-dim))", marginBottom: "2rem" }}>Accédez à vos produits digitaux</p>

                    <form onSubmit={handleLogin} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="votre@email.com"
                                className="glass"
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Mot de passe</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="glass"
                            />
                        </div>

                        {error && <p className={styles.error}>{error}</p>}

                        <button type="submit" className={styles.submitBtn} disabled={loading}>
                            {loading ? "Chargement..." : "Se connecter"}
                        </button>
                    </form>

                    <p className={styles.toggle}>
                        Pas encore de compte ? <Link href="/register">S'inscrire</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
