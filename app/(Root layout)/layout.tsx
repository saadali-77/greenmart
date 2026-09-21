import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartSync from "@/components/cart/CartSync";
import { getCurrentUser } from "@/lib/auth";

export default async function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <>
      <CartSync
        userId={typeof user?.id === "string" ? user.id : null}
      />

      <Navbar />

      <main className="min-h-screen">
        {children}
      </main>

      <Footer />
    </>
  );
}
