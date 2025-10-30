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
          {/* 🔹 Header comum */}
          <Header />

          {/* 🔹 Conteúdo principal */}
          <main className="flex-grow px-4 md:px-6">
            {children}
          </main>

          {/* 🔹 Footer comum */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
