"use client";

import Link from "next/link";
import {
    FaInstagram,
    FaWhatsapp,
    FaHome,
    FaStore,
    FaCommentDots,
    FaInfoCircle,
} from "react-icons/fa";

export default function Footer() {
    // 🔹 Dados de contato
    const whatsappNumber = "5581971168633";
    const text = "Olá! Gostaria de falar com você";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    const instagramLink = "https://www.instagram.com/missao_cm/";

    return (
        <footer className="mt-32 bg-white/80 backdrop-blur-md border-t-4 border-blue-200 shadow-inner">
            <div className="max-w-7xl mx-auto px-8 py-16 grid md:grid-cols-3 gap-14 text-center md:text-left">
                {/* 🔹 Coluna 1 - Sobre */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-extrabold">
                        <span style={{ color: "#0253DB" }}>COLO</span>{" "}
                        <span style={{ color: "#FBE062" }}>DE</span>{" "}
                        <span style={{ color: "#014DAF" }}>MÃE</span>
                    </h3>
                    <p className="text-gray-600 text-base leading-relaxed">
                        Produtos católicos que inspiram fé e amor.
                        Nossa missão é levar luz e esperança a cada lar através de itens
                        que fortalecem a espiritualidade.
                    </p>
                </div>

                {/* 🔹 Coluna 2 - Navegação */}
                <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-[#004BAD]">Navegação</h4>
                    <ul className="space-y-3">
                        <li>
                            <Link
                                href="/"
                                className="flex items-center gap-2 justify-center md:justify-start text-gray-700 hover:text-[#004BAD] transition"
                            >
                                <FaHome /> Início
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/produtos"
                                className="flex items-center gap-2 justify-center md:justify-start text-gray-700 hover:text-[#004BAD] transition"
                            >
                                <FaStore /> Produtos
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/feedback"
                                className="flex items-center gap-2 justify-center md:justify-start text-gray-700 hover:text-[#004BAD] transition"
                            >
                                <FaCommentDots /> Feedback
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/sobre"
                                className="flex items-center gap-2 justify-center md:justify-start text-gray-700 hover:text-[#004BAD] transition"
                            >
                                <FaInfoCircle /> Sobre
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* 🔹 Coluna 3 - Contato */}
                <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-[#004BAD]">Entre em Contato</h4>
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <a
                            href={instagramLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-gray-700 hover:text-pink-600 transition"
                        >
                            <FaInstagram size={22} /> Instagram
                        </a>
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition"
                        >
                            <FaWhatsapp size={22} /> WhatsApp
                        </a>
                    </div>
                </div>
            </div>

            {/* 🔹 Linha divisória reforçada */}
            <div className="w-full border-t border-blue-200 mt-10"></div>

            {/* 🔹 Direitos autorais */}
            <div className="text-center text-sm text-gray-600 py-8">
                © {new Date().getFullYear()}{" "}
                <span className="font-semibold text-[#004BAD]">COLO DE MÃE</span> — Inspirando fé todos os dias ✨
            </div>
        </footer>
    );
}
