"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useAuth } from "@/contexts/AuthContext";
import { auth, db } from "@/lib/firebase";

export default function AdminRegister() {
    const router = useRouter();
    const { setUser, setIsAdmin } = useAuth();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        try {
            const result = await createUserWithEmailAndPassword(auth, email, senha);

            await set(ref(db, `users/${result.user.uid}`), {
                email: result.user.email,
                role: "admin",
                createdAt: new Date().toISOString(),
            });

            if (setUser) setUser(result.user);
            if (setIsAdmin) setIsAdmin(true);

            setSuccessMsg("✅ Conta criada com sucesso! Bem-vindo à CMStore Admin.");

            setTimeout(() => router.push("/"), 1800);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMsg("Erro ao criar conta. Verifique os dados e tente novamente.");
            } else {
                setErrorMsg("Ocorreu um erro inesperado. Tente novamente mais tarde.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-sky-100 via-blue-50 to-sky-200 px-6 py-16 relative overflow-hidden">
            {/* Bolhas decorativas */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-200/40 rounded-full blur-3xl animate-pulse"></div>

            {/* Conteúdo principal */}
            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md text-center flex flex-col items-center"
            >
                {/* Ícone e título */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex flex-col items-center mb-8"
                >
                    <FaUserPlus className="text-blue-600 text-6xl mb-3 drop-shadow-md" />
                    <h1
                        className="text-3xl md:text-4xl font-extrabold tracking-tight"
                        style={{ color: "#004BAD" }}
                    >
                        Criar <span style={{ color: "#FEE05B" }}>Conta Admin</span>
                    </h1>
                    <p className="text-gray-700 mt-2 text-sm md:text-base">
                        Torne-se parte do painel celestial da CMStore ✨
                    </p>
                </motion.div>

                {/* Formulário */}
                <form
                    onSubmit={handleRegister}
                    className="flex flex-col gap-6 w-full text-left"
                >
                    {/* Campo E-mail */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold mb-2">E-mail</label>
                        <input
                            type="email"
                            placeholder="exemplo@dominio.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-4 pr-4 rounded-2xl border border-blue-200 bg-white/40 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                        />
                    </div>

                    {/* Campo Senha */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold mb-2">Senha</label>
                        <div className="relative">
                            <input
                                type={mostrarSenha ? "text" : "password"}
                                placeholder="Crie uma senha segura"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                                className="w-full p-4 pr-12 rounded-2xl border border-blue-200 bg-white/40 placeholder-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                                className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-blue-700 transition"
                                aria-label="Mostrar ou ocultar senha"
                            >
                                {mostrarSenha ? <IoEyeOff size={22} /> : <IoEye size={22} />}
                            </button>
                        </div>
                    </div>

                    {/* Mensagens de erro/sucesso */}
                    {errorMsg && (
                        <p className="text-red-600 text-sm text-center">{errorMsg}</p>
                    )}
                    {successMsg && (
                        <p className="text-green-600 text-sm text-center">{successMsg}</p>
                    )}

                    {/* Botão de cadastro */}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        disabled={loading}
                        className="mt-2 w-full bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 text-white font-semibold py-3 rounded-2xl shadow-md hover:shadow-lg transition"
                    >
                        {loading ? "Cadastrando..." : "Cadastrar"}
                    </motion.button>
                </form>

                {/* Link de login */}
                <p className="text-gray-700 text-sm text-center mt-6">
                    Já tem conta?{" "}
                    <a
                        href="/admin-login"
                        className="text-blue-700 font-semibold hover:underline"
                    >
                        Faça login
                    </a>
                </p>
            </motion.div>
        </main>
    );
}
