import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/Providers/ReduxProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";


export const metadata: Metadata = {
  title: "GreenMart Store",
  description: "Fresh groceries delivered online",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">

      <body>
     <ReduxProvider>
        <Navbar />

        <main className="min-h-screen">
          {children}
        </main>

        <Footer />
        </ReduxProvider>

      </body>

    </html>
  );
}