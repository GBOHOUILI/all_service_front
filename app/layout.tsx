import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BRAND } from "@/lib/brand";

const fraunces = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: `${BRAND.name} | Fleuriste premium & compositions sur-mesure`,
  description:
    `Compositions florales élégantes, fraîches et sur-mesure. Livraison soignée à ${BRAND.city}.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${inter.variable}`}>
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
