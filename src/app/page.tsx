"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Star, BookOpen, Shirt, CircleDot } from "lucide-react"; // ✅ substituímos por CircleDot
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center text-center bg-gradient-to-b from-sky-100 via-blue-50 to-sky-200 px-6 py-20 overflow-hidden">
      {/* 🔹 Logo e título */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center space-y-4"
      >
        <Image
          src="/logo.png"
          alt="Logo CMStore"
          width={180}
          height={180}
          className="drop-shadow-lg mb-2"
          priority
        />

        <h1 className="text-6xl font-extrabold tracking-tight drop-shadow-sm">
          <span style={{ color: "#004BAD" }}>C</span>
          <span style={{ color: "#FEE05B" }}>M</span>
          <span style={{ color: "#004BAD" }}>Store</span>
        </h1>

        <p className="text-lg text-gray-700 max-w-2xl leading-relaxed mt-2">
          Produtos católicos com propósito e fé — bíblias, terços, blusas e muito mais.
          Inspire-se com artigos que fortalecem sua devoção e expressam sua crença.
        </p>
      </motion.div>

      {/* ✨ CTA principal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-14 mb-16"
      >
        <Link
          href="/produtos"
          className="inline-flex items-center gap-3 bg-[#004BAD] hover:bg-[#003b8a] text-white px-10 py-3 rounded-full font-semibold text-lg shadow-lg transition-transform transform hover:-translate-y-1"
        >
          Ver produtos
          <ShoppingBag className="w-5 h-5" />
        </Link>
      </motion.div>

      {/* 🔸 Linha divisória */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#004BAD]/40 to-transparent mb-20"
      />

      {/* 💎 Cards informativos */}
      <section className="w-full max-w-6xl grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: <BookOpen className="w-8 h-8 text-white" />,
            color: "from-[#004BAD] to-[#005DE0]",
            title: "Bíblias e Livros",
            desc: "Edições sagradas e leituras inspiradoras para fortalecer sua fé.",
          },
          {
            icon: <CircleDot className="w-8 h-8 text-white" />, // ✅ substituição segura
            color: "from-[#00A3E0] to-[#004BAD]",
            title: "Terços e Medalhas",
            desc: "Símbolos de devoção e proteção, perfeitos para o dia a dia.",
          },
          {
            icon: <Shirt className="w-8 h-8 text-white" />,
            color: "from-[#FEE05B] to-[#FFD600]",
            title: "Blusas e Acessórios",
            desc: "Vista sua fé com estilo através de produtos personalizados.",
          },
          {
            icon: <Star className="w-8 h-8 text-white" />,
            color: "from-[#004BAD] to-[#0078FF]",
            title: "Qualidade e Confiança",
            desc: "Produtos escolhidos com excelência, propósito e amor cristão.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
            whileHover={{ scale: 1.05, rotate: 0.5 }}
            className="relative bg-white/60 backdrop-blur-lg rounded-3xl shadow-lg border border-white/70 p-10 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl"
          >
            <div className={`bg-gradient-to-r ${item.color} p-5 rounded-full shadow-md mb-5`}>
              {item.icon}
            </div>
            <h3 className="text-2xl font-bold text-[#004BAD] mb-2">{item.title}</h3>
            <p className="text-gray-700 text-sm max-w-xs leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
