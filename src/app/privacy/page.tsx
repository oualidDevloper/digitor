export default function PrivacyPage() {
    return (
        <div className="fade-in" style={{ paddingTop: "140px", paddingBottom: "80px" }}>
            <div className="container" style={{ maxWidth: "800px" }}>
                <h1 className="section-title" style={{ textAlign: "left", marginBottom: "3rem" }}>Politique de Confidentialité</h1>

                <div className="glass" style={{ padding: "3rem", borderRadius: "24px", lineHeight: "1.8", color: "hsl(var(--text-secondary))" }}>
                    <section style={{ marginBottom: "2.5rem" }}>
                        <h2 style={{ color: "white", marginBottom: "1rem" }}>1. Collecte des Données</h2>
                        <p>Nous collectons les informations nécessaires au bon traitement de vos commandes : nom, adresse email et informations de paiement (gérées de manière sécurisée par Stripe).</p>
                    </section>

                    <section style={{ marginBottom: "2.5rem" }}>
                        <h2 style={{ color: "white", marginBottom: "1rem" }}>2. Utilisation des Données</h2>
                        <p>Vos données sont utilisées exclusivement pour vous fournir l'accès à vos achats, vous envoyer les reçus par email et assurer le support client.</p>
                    </section>

                    <section style={{ marginBottom: "2.5rem" }}>
                        <h2 style={{ color: "white", marginBottom: "1rem" }}>3. Sécurité</h2>
                        <p>Nous utilisons des protocoles de sécurité avancés (SSL, encryption) et des partenaires de confiance comme Supabase et Stripe pour protéger vos informations personnelles.</p>
                    </section>

                    <section style={{ marginBottom: "2.5rem" }}>
                        <h2 style={{ color: "white", marginBottom: "1rem" }}>4. Vos Droits</h2>
                        <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles. Contactez-nous pour toute demande.</p>
                    </section>

                    <section>
                        <h2 style={{ color: "white", marginBottom: "1rem" }}>5. Cookies</h2>
                        <p>Nous utilisons des cookies essentiels pour maintenir votre session de connexion et le contenu de votre panier.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
