"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-sky-100 via-blue-50 to-sky-200 text-center px-6 py-16 overflow-hidden">
      {/* Efeito de leveza e profundidade */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="space-y-8 max-w-3xl"
      >
        {/* Logo */}
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <Image
              src="/logo.png"
              alt="CMStore"
              width={240}
              height={240}
              className="mx-auto drop-shadow-md"
              priority
            />
          </motion.div>
        </div>

        {/* Texto principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-sm">
            <span style={{ color: "#004BAD" }}>Bem-vindo à{" "}</span>
            <span className="inline-block">
              <span style={{ color: "#004BAD" }}>C</span>
              <span style={{ color: "#FEE05B" }}>M</span>
              <span style={{ color: "#004BAD" }}>Store</span>
            </span>{" "}
            ✨
          </h1>

          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto mb-10">
            Sinta-se nas nuvens enquanto descobre produtos incríveis, pensados
            com carinho para tornar seu dia mais leve e especial 💙
          </p>
        </motion.div>
        
        {/* Botão CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Link
            href="/produtos"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            Ver produtos 🌤️
          </Link>
        </motion.div>
      </motion.div>

      {/* Elementos decorativos sutis */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-white/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-sky-300/30 rounded-full blur-3xl animate-pulse"></div>
    </main>
  );
}
