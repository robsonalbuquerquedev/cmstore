import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "Colo de Mãe",
  description: "E-commerce de produtos da Colo de Mãe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen bg-gradient-to-b from-sky-100 via-blue-50 to-sky-200 text-gray-800">
        <AuthProvider>
          <Header />

          {/* Espaço reservado para compensar o header fixo */}
          <div className="h-24 md:h-28"></div>

          <main className="flex-grow relative z-0">
            {children}
          </main>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
