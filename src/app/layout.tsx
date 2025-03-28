import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./[slug]/menu/contexts/cart";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mc Donald's",
  description: "Toténs de pedido de Mc Donald's",
  icons: "/z_mcdonalds_burger_logo_brand_icon_133252.ico", // Caminho para o favicon
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/ico"
          href="/z_mcdonalds_burger_logo_brand_icon_133252.ico"
        />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <CartProvider>{children}</CartProvider>
        <Toaster />
      </body>
    </html>
  );
}
