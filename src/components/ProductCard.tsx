import Image from "next/image";
import Link from "next/link";
import "./ProductCard.css";

interface ProductCardProps {
    id: string;
    title: string;
    price: number;
    image: string;
    category: string;
    format: string;
}

export default function ProductCard({ id, title, price, image, category, format }: ProductCardProps) {
    return (
        <div className="product-card glass">
            <div className="product-image-container">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="product-image"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="product-badge">{format}</div>
            </div>

            <div className="product-info">
                <span className="product-category">{category}</span>
                <h3 className="product-title">{title}</h3>

                <div className="product-footer">
                    <span className="product-price">{price}€</span>
                    <Link href={`/product/${id}`} className="view-btn">
                        Voir
                    </Link>
                </div>
            </div>
        </div>
    );
}
