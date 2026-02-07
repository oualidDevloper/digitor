import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import CartSidebar from "@/components/CartSidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digitor | Produits Digitaux Premium",
  description: "Boutique en ligne spécialisée dans les formations vidéo, livres numériques et logiciels premium. Boostez vos compétences avec Digitor.",
  keywords: ["digital products", "ebooks", "video courses", "software", "premium assets", "e-learning"],
  authors: [{ name: "Digitor Team" }],
  openGraph: {
    title: "Digitor | Produits Digitaux Premium",
    description: "Boutique en ligne spécialisée dans les formations vidéo, livres numériques et logiciels premium.",
    url: "https://digitor.com",
    siteName: "Digitor",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Digitor Store Preview",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digitor | Produits Digitaux Premium",
    description: "Boutique en ligne spécialisée dans les formations vidéo, livres numériques et logiciels premium.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-theme="dark">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <CartProvider>
          <Header />
          <CartSidebar />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
