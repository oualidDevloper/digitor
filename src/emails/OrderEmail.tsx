import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Section,
    Text,
    Hr,
    Img,
} from "@react-email/components";
import * as React from "react";

interface OrderEmailProps {
    customerName: string;
    orderId: string;
    products: { title: string; price: number; downloadUrl: string }[];
    totalAmount: number;
}

export const OrderEmail = ({
    customerName,
    orderId,
    products,
    totalAmount,
}: OrderEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Votre commande Digitor #{orderId} est prête !</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>Merci pour votre commande, {customerName} !</Heading>
                    <Text style={text}>
                        Votre paiement a été validé. Voici vos produits digitaux prêts au téléchargement :
                    </Text>

                    <Section style={productsSection}>
                        {products.map((product, index) => (
                            <div key={index} style={productRow}>
                                <Text style={productTitle}>
                                    <strong>{product.title}</strong>
                                </Text>
                                <Link href={product.downloadUrl} style={button}>
                                    Télécharger
                                </Link>
                            </div>
                        ))}
                    </Section>

                    <Hr style={hr} />

                    <Section>
                        <Text style={footerText}>
                            <strong>Total : {totalAmount}€</strong>
                        </Text>
                        <Text style={footerText}>Numéro de commande : {orderId}</Text>
                    </Section>

                    <Hr style={hr} />

                    <Text style={footer}>
                        Vous pouvez également retrouver tous vos achats à tout moment dans votre{" "}
                        <Link href={`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`} style={link}>
                            Espace Personnel Digitor
                        </Link>.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};

const main = {
    backgroundColor: "#0a0a0a",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "40px 20px",
    backgroundColor: "#111111",
    borderRadius: "12px",
    border: "1px solid #222222",
};

const h1 = {
    color: "#ffffff",
    fontSize: "24px",
    fontWeight: "700",
    textAlign: "center" as const,
    margin: "30px 0",
};

const text = {
    color: "#aaaaaa",
    fontSize: "16px",
    lineHeight: "26px",
    textAlign: "center" as const,
};

const productsSection = {
    marginTop: "32px",
};

const productRow = {
    padding: "16px",
    backgroundColor: "#1a1a1a",
    borderRadius: "8px",
    marginBottom: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

const productTitle = {
    color: "#ffffff",
    margin: "0",
};

const button = {
    backgroundColor: "#6366f1",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "inline-block",
    padding: "8px 16px",
};

const hr = {
    borderColor: "#222222",
    margin: "20px 0",
};

const footerText = {
    color: "#ffffff",
    fontSize: "14px",
    margin: "4px 0",
};

const footer = {
    color: "#555555",
    fontSize: "12px",
    textAlign: "center" as const,
    marginTop: "20px",
};

const link = {
    color: "#6366f1",
    textDecoration: "underline",
};
