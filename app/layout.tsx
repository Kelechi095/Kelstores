import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "./components/nav/Navbar";
import Footer from "./components/footer/Footer";
import CartProvider from "./providers/CartProvider";
import ToasterProvider from "./providers/ToastProvider";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Loading from "./loading";
import { Suspense } from "react";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Kelstores",
  description: "Ecommerce application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
        <ToasterProvider />
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <Suspense fallback={<Loading />}>
              <main className="flex-grow">{children}</main>
              <Footer />
            </Suspense>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
