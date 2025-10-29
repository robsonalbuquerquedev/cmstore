"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, isAdmin } = useAuth();

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

    // 🔹 Detecta rolagem para efeito dinâmico do header
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuItems = ["Home", "Produtos", "Feedback"];

    return (
        <motion.header
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`fixed w-full top-0 z-50 transition-all duration-700 ${isScrolled
                ? "bg-gradient-to-r from-blue-800 via-blue-700 to-blue-900/95 shadow-2xl backdrop-blur-xl"
                : "bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700 backdrop-blur-md shadow-md"
                }`}
        >
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 md:py-5 px-6 md:px-10">
                {/* 🔹 Logo + Nome */}
                <div className="flex items-center gap-3 md:gap-4">
                    <Link href="/" className="flex items-center gap-3 group">
                        <Image
                            src="/logo.png"
                            alt="CMStore Logo"
                            width={48}
                            height={48}
                            className="rounded-full drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                            priority
                        />
                        <motion.h1
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="text-2xl md:text-3xl font-extrabold tracking-tight drop-shadow-sm"
                        >
                            <span style={{ color: "#0253DB" }}>COLO</span>{" "}
                            <span style={{ color: "#FBE062" }}>DE</span>{" "}
                            <span style={{ color: "#014DAF" }}>MÃE</span>
                        </motion.h1>
                    </Link>
                </div>

                {/* 🔹 Menu Desktop */}
                <nav className="hidden md:flex gap-10 items-center">
                    {menuItems.map((item) => (
                        <Link
                            key={item}
                            href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                            className="relative text-lg font-medium text-white/90 hover:text-white transition duration-300 group"
                        >
                            {item}
                            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}

                    {user && isAdmin && (
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 px-5 py-2 rounded-full font-medium text-white shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
                        >
                            <FiLogOut size={20} /> Sair
                        </button>
                    )}
                </nav>

                {/* 🔹 Menu Mobile */}
                <div className="md:hidden ml-auto">
                    <button
                        onClick={toggleMenu}
                        className="p-2 rounded-md hover:bg-blue-500/30 transition"
                    >
                        {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                    </button>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="absolute right-6 top-16 bg-gradient-to-b from-blue-600 via-sky-500 to-blue-400 text-white rounded-2xl shadow-2xl p-6 flex flex-col gap-5 w-64 backdrop-blur-md border border-white/20"
                            >
                                {menuItems.map((item) => (
                                    <Link
                                        key={item}
                                        href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                        className="text-lg font-medium hover:text-yellow-200 transition"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item}
                                    </Link>
                                ))}

                                {user && isAdmin && (
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            handleLogout();
                                        }}
                                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-full font-medium hover:scale-105 transition-all duration-300"
                                    >
                                        <FiLogOut size={20} /> Sair
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.header>
    );
}
