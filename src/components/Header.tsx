"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
    FaBars,
    FaTimes,
    FaSignOutAlt,
    FaHome,
    FaStore,
    FaCommentDots,
    FaInfoCircle,
} from "react-icons/fa";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { user } = useAuth();

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert("✅ Logout realizado com sucesso!");
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error);
                alert("❌ Erro ao sair: " + error.message);
            } else {
                console.error(error);
                alert("❌ Erro ao sair!");
            }
        }
    };

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white/90 backdrop-blur-md shadow-md"
                    : "bg-white/60 backdrop-blur-sm"
                }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
                {/* 🔹 Logo + Título */}
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="Logo Colo de Mãe"
                        width={50}
                        height={50}
                        className="rounded-full"
                        priority
                    />
                    <h1 className="text-2xl font-extrabold tracking-tight">
                        <span style={{ color: "#0253DB" }}>COLO</span>{" "}
                        <span style={{ color: "#FBE062" }}>DE</span>{" "}
                        <span style={{ color: "#014DAF" }}>MÃE</span>
                    </h1>
                </Link>

                {/* 🔹 Menu Desktop */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-[#004BAD] font-medium hover:text-[#014DAF] transition-colors"
                    >
                        <FaHome />
                        Início
                    </Link>
                    <Link
                        href="/produtos"
                        className="flex items-center gap-2 text-[#004BAD] font-medium hover:text-[#014DAF] transition-colors"
                    >
                        <FaStore />
                        Produtos
                    </Link>
                    <Link
                        href="/feedback"
                        className="flex items-center gap-2 text-[#004BAD] font-medium hover:text-[#014DAF] transition-colors"
                    >
                        <FaCommentDots />
                        Feedback
                    </Link>
                    <Link
                        href="/sobre"
                        className="flex items-center gap-2 text-[#004BAD] font-medium hover:text-[#014DAF] transition-colors"
                    >
                        <FaInfoCircle />
                        Sobre
                    </Link>

                    {/* 🔹 Botão sair (visível apenas se logado) */}
                    {user && (
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-white bg-[#004BAD] hover:bg-[#003b8a] px-4 py-2 rounded-full font-medium shadow transition"
                        >
                            <FaSignOutAlt />
                            Sair
                        </button>
                    )}
                </nav>

                {/* 🔹 Menu Mobile (ícone hambúrguer) */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-[#004BAD]"
                    aria-label="Abrir menu"
                >
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* 🔹 Menu Mobile (drawer animado) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.nav
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-white/90 backdrop-blur-md shadow-md border-t border-blue-100"
                    >
                        <div className="flex flex-col items-center py-4 space-y-4">
                            {[
                                { name: "Início", path: "/", icon: <FaHome /> },
                                { name: "Produtos", path: "/produtos", icon: <FaStore /> },
                                { name: "Feedback", path: "/feedback", icon: <FaCommentDots /> },
                                { name: "Sobre", path: "/sobre", icon: <FaInfoCircle /> },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-2 text-[#004BAD] text-lg font-medium hover:text-[#014DAF] transition-colors"
                                    >
                                        {item.icon}
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}

                            {/* 🔹 Botão sair (mobile) */}
                            {user && (
                                <motion.button
                                    onClick={() => {
                                        handleLogout();
                                        setIsOpen(false);
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 text-white bg-[#004BAD] hover:bg-[#003b8a] px-4 py-2 rounded-full font-medium shadow transition"
                                >
                                    <FaSignOutAlt />
                                    Sair
                                </motion.button>
                            )}
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}
