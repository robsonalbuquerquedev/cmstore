"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const whatsappNumber = "5581971168633";
    const text = "Olá! Gostaria de falar com você"; // mensagem padrão

    const icons = [
        {
            icon: <FaInstagram />,
            link: "https://www.instagram.com/missao_cm/",
            label: "Instagram",
        },
        {
            icon: <FaWhatsapp />,
            link: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
            label: "WhatsApp",
        },
    ];

    return (
        <motion.footer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-t from-blue-800 via-blue-700 to-sky-600 text-white mt-20 shadow-inner backdrop-blur-md"
        >
            <div className="container mx-auto flex flex-col items-center justify-center py-10 px-6 md:px-10 gap-6 text-center">
                {/* 🔹 Título opcional */}
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-lg md:text-xl font-semibold tracking-wide text-white/90"
                >
                    Conecte-se com a Colo de Mãe
                </motion.h2>

                {/* 🔹 Ícones sociais */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    className="flex gap-8 mt-2"
                >
                    {icons.map(({ icon, link, label }, index) => (
                        <a
                            key={index}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="text-white/90 hover:text-yellow-200 text-3xl transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                        >
                            {icon}
                        </a>
                    ))}
                </motion.div>

                {/* 🔹 Linha divisória suave */}
                <div className="w-32 h-[2px] bg-white/30 rounded-full mt-4"></div>

                {/* 🔹 Texto final */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-sm md:text-base text-white/80 mt-4"
                >
                    © {currentYear} <span className="font-semibold text-white">Colo de Mãe</span>.
                    Todos os direitos reservados.
                </motion.p>
            </div>
        </motion.footer>
    );
}
