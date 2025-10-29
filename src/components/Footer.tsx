"use client";

import Link from "next/link";
import { FaInstagram, FaWhatsapp, FaHome, FaStore, FaCommentDots, FaInfoCircle } from "react-icons/fa";

export default function Footer() {
    // 🔹 Dados de contato
    const whatsappNumber = "5581971168633";
    const text = "Olá! Gostaria de falar com você";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    const instagramLink = "https://www.instagram.com/missao_cm/";

    return (
        <footer className="mt-20 bg-white/70 backdrop-blur-md border-t border-blue-100 shadow-inner">
            <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-10 text-center md:text-left">
                {/* 🔹 Coluna 1 - Sobre */}
                <div>
                    <h3 className="text-xl font-bold mb-3">
                        <span style={{ color: "#0253DB" }}>COLO</span>{" "}
                        <span style={{ color: "#FBE062" }}>DE</span>{" "}
                        <span style={{ color: "#014DAF" }}>MÃE</span>
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Produtos católicos que inspiram fé e amor.
                        Nossa missão é levar luz e esperança a cada lar através de itens que fortalecem a espiritualidade.
                    </p>
                </div>

                {/* 🔹 Coluna 2 - Navegação */}
                <div>
                    <h4 className="text-lg font-semibold text-[#004BAD] mb-3">Navegação</h4>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/" className="flex items-center gap-2 justify-center md:justify-start text-gray-700 hover:text-[#004BAD] transition">
                                <FaHome /> Início
                            </Link>
                        </li>
                        <li>
                            <Link href="/produtos" className="flex items-center gap-2 justify-center md:justify-start text-gray-700 hover:text-[#004BAD] transition">
                                <FaStore /> Produtos
                            </Link>
                        </li>
                        <li>
                            <Link href="/feedback" className="flex items-center gap-2 justify-center md:justify-start text-gray-700 hover:text-[#004BAD] transition">
                                <FaCommentDots /> Feedback
                            </Link>
                        </li>
                        <li>
                            <Link href="/sobre" className="flex items-center gap-2 justify-center md:justify-start text-gray-700 hover:text-[#004BAD] transition">
                                <FaInfoCircle /> Sobre
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* 🔹 Coluna 3 - Contato */}
                <div>
                    <h4 className="text-lg font-semibold text-[#004BAD] mb-3">Entre em Contato</h4>
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <a
                            href={instagramLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-700 hover:text-pink-600 transition"
                        >
                            <FaInstagram size={20} /> Instagram
                        </a>
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition"
                        >
                            <FaWhatsapp size={20} /> WhatsApp
                        </a>
                    </div>
                </div>
            </div>

            {/* 🔹 Linha divisória */}
            <div className="w-full border-t border-blue-100"></div>

            {/* 🔹 Direitos autorais */}
            <div className="text-center text-sm text-gray-500 py-5">
                © {new Date().getFullYear()}{" "}
                <span className="font-semibold text-[#004BAD]">COLO DE MÃE</span> — Inspirando fé todos os dias.
            </div>
        </footer>
    );
}
