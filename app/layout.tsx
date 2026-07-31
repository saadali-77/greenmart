import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/Providers/ReduxProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "GreenMart",
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
          {children}

          <Toaster
            position="top-right"
            richColors
            closeButton
          />
        </ReduxProvider>
      </body>
    </html>
  );
}