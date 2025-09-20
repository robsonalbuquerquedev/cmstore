"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, isAdmin } = useAuth();

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert("✅ Logout realizado com sucesso!");
        } catch (error: unknown) {
            // Se quisermos acessar a mensagem de erro, precisamos checar se é um Error
            if (error instanceof Error) {
                console.error(error);
                alert("❌ Erro ao sair: " + error.message);
            } else {
                console.error(error);
                alert("❌ Erro ao sair!");
            }
        }
    };
    
    const menuItems = ["Home", "Produtos", "Feedback"];

    return (
        <header className="bg-blue-600 text-white shadow-md w-full">
            {/* Título */}
            <div className="container mx-auto flex justify-center items-center pt-10 md:pt-16 px-6 md:px-10">
                <h1 className="text-4xl md:text-5xl font-bold text-center">
                    Colo de Mãe
                </h1>
            </div>

            {/* Menu + Logo */}
            <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-10  relative">
                {/* Logo opcional */}
                <div className="flex items-center gap-4">
                    {/* Exemplo de logo
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" /> */}
                </div>

                {/* Menu desktop */}
                <nav className="hidden md:flex gap-10 items-center">
                    {menuItems.map((item) => (
                        <Link
                            key={item}
                            href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                            className="hover:text-blue-200 text-lg font-medium px-2 py-1 rounded transition"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                {/* Botão Sair desktop */}
                {user && isAdmin && (
                    <div className="hidden md:flex">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-red-500 px-5 py-2 rounded-lg hover:bg-red-600 transition shadow cursor-pointer"
                        >
                            <FiLogOut size={20} /> Sair
                        </button>
                    </div>
                )}

                {/* Menu mobile */}
                <div className="md:hidden ml-auto relative">
                    <button onClick={toggleMenu}>
                        {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
                    </button>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="absolute top-full right-0 bg-blue-600 rounded-lg shadow-lg p-6 flex flex-col gap-4 w-60 mt-2 z-50"
                            >
                                {menuItems.map((item) => (
                                    <Link
                                        key={item}
                                        href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                        className="hover:text-blue-200 text-lg font-medium px-2 py-2 rounded transition"
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
                                        className="flex items-center gap-2 bg-red-500 px-5 py-2 rounded-lg hover:bg-red-600 transition shadow cursor-pointer"
                                    >
                                        <FiLogOut size={20} /> Sair
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
