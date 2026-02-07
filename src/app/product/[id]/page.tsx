import Image from "next/image";
import { products } from "@/data/products";
import styles from "./product.module.css";
import { notFound } from "next/navigation";
import AddToCartButton from "./AddToCartButton";

export default async function ProductPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const product = products.find(p => p.id === id);

    if (!product) {
        notFound();
    }

    return (
        <div className="fade-in" style={{ paddingTop: "140px" }}>
            <div className="container">
                <div className={styles.productLayout}>
                    <div className={styles.imageSection}>
                        <div className={`${styles.imageWrapper} glass`}>
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className={styles.image}
                                priority
                            />
                        </div>
                    </div>

                    <div className={styles.infoSection}>
                        <span className={styles.category}>{product.category}</span>
                        <h1 className={styles.title}>{product.title}</h1>
                        <p className={styles.format}>Format: <strong>{product.format}</strong></p>

                        <div className={styles.priceTag}>
                            <span className={styles.price}>{product.price}€</span>
                            <span className={styles.vat}>TTC</span>
                        </div>

                        <p className={styles.description}>{product.description}</p>

                        <div className={styles.actions}>
                            <AddToCartButton product={product} />
                            <div className={styles.trustBadge}>
                                🔒 Paiement sécurisé & Livraison immédiate
                            </div>
                        </div>

                        <div className={styles.features}>
                            <div className={styles.featureItem}>
                                <span>✅</span> Accès à vie
                            </div>
                            <div className={styles.featureItem}>
                                <span>✅</span> Mises à jour gratuites
                            </div>
                            <div className={styles.featureItem}>
                                <span>✅</span> Support prioritaire
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
