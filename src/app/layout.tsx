import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { CartProvider } from "../context/cartContext";
import Cart from "@/components/Cart/Cart";

export const metadata: Metadata = {
  title: "KitsuneSPLY",
  description: "Shop unique and stylish products at KitsuneSPLY",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <Cart />
          <main> {children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
