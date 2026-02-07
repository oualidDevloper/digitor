"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    return (
        <div className="fade-in" style={{ paddingTop: "140px", minHeight: "80vh", display: "flex", alignItems: "center", textAlign: "center" }}>
            <div className="container" style={{ maxWidth: "600px" }}>
                <div className="glass" style={{ padding: "4rem", borderRadius: "32px" }}>
                    <CheckCircle size={80} color="hsl(var(--accent-primary))" style={{ marginBottom: "2rem" }} />
                    <h1 className="gradient-text" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Paiement Réussi !</h1>
                    <p style={{ color: "hsl(var(--text-secondary))", fontSize: "1.1rem", marginBottom: "2.5rem", lineHeight: "1.6" }}>
                        Merci pour votre achat. Vos produits digitaux sont maintenant disponibles dans votre espace personnel.
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <Link href="/dashboard" className="btn primary" style={{ width: "100%", padding: "16px" }}>
                            Accéder à mes téléchargements
                        </Link>
                        <Link href="/" className="btn secondary" style={{ width: "100%", padding: "16px" }}>
                            Retour à l'accueil
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
