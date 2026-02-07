import Link from "next/link";
import "./Footer.css";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer-container">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <span className="logo-text gradient-text">Digitor</span>
                        <p className="footer-tagline">
                            L'excellence digitale à votre portée. Produits premium, livraison instantanée.
                        </p>
                    </div>

                    <div className="footer-links">
                        <div className="links-group">
                            <h4>Boutique</h4>
                            <ul>
                                <li><Link href="/catalog">Catalogue</Link></li>
                                <li><Link href="/about">À propos</Link></li>
                                <li><Link href="/faq">FAQ</Link></li>
                            </ul>
                        </div>

                        <div className="links-group">
                            <h4>Légal</h4>
                            <ul>
                                <li><Link href="/terms">CGV</Link></li>
                                <li><Link href="/privacy">Confidentialité</Link></li>
                                <li><Link href="/contact">Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} Digitor. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
}
