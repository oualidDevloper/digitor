export interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    category: string;
    format: string;
    featured?: boolean;
}

export const products: Product[] = [
    {
        id: "1",
        title: "Masterclass: Design Créatif Futuriste",
        description: "Apprenez à créer des interfaces modernes avec des effets de glassmorphism et des animations fluides.",
        price: 49,
        image: "/masterclass.png",
        category: "Formation Vidéo",
        format: "MP4 / HD",
        featured: true
    },
    {
        id: "2",
        title: "Ebook: Stratégies de Richesse Digitale",
        description: "Le guide ultime pour monétiser vos compétences en ligne et bâtir un empire numérique.",
        price: 29,
        image: "/ebook.png",
        category: "Livre Numérique",
        format: "PDF / EPUB",
        featured: true
    },
    {
        id: "3",
        title: "Pack Logiciel: UI Toolkit Pro",
        description: "Une suite d'outils et de scripts pour accélérer votre flux de travail de développement frontend.",
        price: 79,
        image: "/software.png",
        category: "Logiciel",
        format: "ZIP / EXE",
        featured: true
    }
];
