export default function TermsPage() {
    return (
        <div className="fade-in" style={{ paddingTop: "140px", paddingBottom: "80px" }}>
            <div className="container" style={{ maxWidth: "800px" }}>
                <h1 className="section-title" style={{ textAlign: "left", marginBottom: "3rem" }}>Conditions Générales de Vente</h1>

                <div className="glass" style={{ padding: "3rem", borderRadius: "24px", lineHeight: "1.8", color: "hsl(var(--text-secondary))" }}>
                    <section style={{ marginBottom: "2.5rem" }}>
                        <h2 style={{ color: "white", marginBottom: "1rem" }}>1. Introduction</h2>
                        <p>Bienvenue sur Digitor. En accédant à ce site, vous acceptez nos conditions générales de vente. Ces conditions régissent l'achat de tous nos produits digitaux.</p>
                    </section>

                    <section style={{ marginBottom: "2.5rem" }}>
                        <h2 style={{ color: "white", marginBottom: "1rem" }}>2. Nature des Produits</h2>
                        <p>Digitor propose des produits numériques (vidéos, eBooks, logiciels). Étant donné la nature immatérielle de ces contenus, aucun remboursement ne sera possible une fois que le lien de téléchargement a été généré ou utilisé.</p>
                    </section>

                    <section style={{ marginBottom: "2.5rem" }}>
                        <h2 style={{ color: "white", marginBottom: "1rem" }}>3. Utilisation des Contenus</h2>
                        <p>L'achat d'un produit vous confère une licence d'utilisation personnelle et non exclusive. La revente, le partage ou la distribution non autorisée de nos contenus est strictement interdite.</p>
                    </section>

                    <section style={{ marginBottom: "2.5rem" }}>
                        <h2 style={{ color: "white", marginBottom: "1rem" }}>4. Livraison</h2>
                        <p>La livraison des produits est instantanée après validation du paiement. Un email de confirmation contenant les accès vous est envoyé automatiquement par notre système.</p>
                    </section>

                    <section>
                        <h2 style={{ color: "white", marginBottom: "1rem" }}>5. Contact</h2>
                        <p>Pour toute question concernant votre commande, vous pouvez nous contacter via notre support client.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
