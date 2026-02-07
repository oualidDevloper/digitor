"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import styles from "./auth.module.css";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push("/login?message=Check your email to confirm your account");
        }
    };

    return (
        <div className="fade-in" style={{ paddingTop: "140px", minHeight: "80vh", display: "flex", alignItems: "center" }}>
            <div className="container" style={{ maxWidth: "450px" }}>
                <div className={`${styles.authCard} glass`}>
                    <h1 className="gradient-text" style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Inscription</h1>
                    <p style={{ color: "hsl(var(--text-dim))", marginBottom: "2rem" }}>Rejoignez Digitor dès aujourd'hui</p>

                    <form onSubmit={handleRegister} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label>Nom complet</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                placeholder="Jean Dupont"
                                className="glass"
                            />
                        </div>

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
                            {loading ? "Chargement..." : "Créer mon compte"}
                        </button>
                    </form>

                    <p className={styles.toggle}>
                        Déjà un compte ? <Link href="/login">Se connecter</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
