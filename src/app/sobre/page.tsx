"use client";

import { motion } from "framer-motion";
import { Wrench } from "lucide-react";

export default function Sobre() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-b from-sky-100 via-blue-50 to-sky-200 px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-white/70 backdrop-blur-md border border-white/80 shadow-xl rounded-3xl p-10 max-w-lg"
            >
                <Wrench className="w-16 h-16 text-[#004BAD] mx-auto mb-6" />
                <h1 className="text-3xl font-extrabold mb-2">
                    <span style={{ color: "#0253DB" }}>COLO</span>{" "}
                    <span style={{ color: "#FBE062" }}>DE</span>{" "}
                    <span style={{ color: "#014DAF" }}>MÃE</span>
                </h1>

                <h2 className="text-xl font-semibold text-[#004BAD] mb-4">
                    Página em Manutenção 🛠️
                </h2>

                <p className="text-gray-700 leading-relaxed">
                    Estamos preparando esta seção com muito carinho e fé para contar
                    nossa história e missão.
                    Em breve, você poderá conhecer mais sobre o propósito da{" "}
                    <strong>Colo de Mãe</strong>.
                </p>

                <p className="text-gray-500 text-sm mt-6">
                    Agradecemos pela compreensão 💙
                </p>
            </motion.div>
        </main>
    );
}
