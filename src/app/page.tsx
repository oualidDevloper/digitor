import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import styles from "./page.module.css";

export default function Home() {
  const featuredProducts = products.filter(p => p.featured);

  return (
    <div className="fade-in">
      <section className={styles.hero}>
        <div className="container">
          <h1 className="gradient-text" style={{ fontSize: "4rem", fontWeight: 800, marginBottom: "1rem" }}>
            Digitor
          </h1>
          <p style={{ fontSize: "1.25rem", color: "hsl(var(--text-secondary))", maxWidth: "600px", margin: "0 auto 2rem" }}>
            Découvrez notre sélection exclusive de produits digitaux premium.
            Formation, logiciels, guides et plus encore.
          </p>
          <div className={styles.actions}>
            <button className={styles.primaryBtn}>Explorer le catalogue</button>
            <button className={styles.secondaryBtn}>En savoir plus</button>
          </div>
        </div>
      </section>

      <section className={styles.featured}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className="section-title">Produits Mis en Avant</h2>
            <p className="section-subtitle">Les meilleurs outils pour votre succès numérique</p>
          </div>

          <div className={styles.productGrid}>
            {featuredProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
