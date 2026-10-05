import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "All Services | Fleuriste premium & compositions sur-mesure",
  description:
    "Compositions florales élégantes, fraîches et sur-mesure. Livraison soignée à Paris.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning>
        <CartProvider>
          <Header />
          <main style={{ minHeight: "60vh" }}>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
