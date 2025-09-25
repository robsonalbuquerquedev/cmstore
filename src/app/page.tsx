"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 to-blue-100 text-center p-6">
      {/* Logo / Imagem de destaque */}
      <div className="mb-8">
        <Image
          src="/logo.png"
          alt="CMStore"
          width={250}
          height={250}
          className="mx-auto drop-shadow-lg"
        />
      </div>

      {/* Texto principal */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 mb-4">
        Bem-vindo à CMStore ✨
      </h1>
      <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mb-8">
        Aqui você encontra os produtos mais pedidos pela comunidade,
        com praticidade e carinho no atendimento 💙
      </p>

      {/* CTA */}
      <Link
        href="/produtos"
        className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-md hover:bg-blue-700 transition"
      >
        Ver produtos
      </Link>
    </main>
  );
}
