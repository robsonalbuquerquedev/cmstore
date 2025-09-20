"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { IoEyeOff, IoEye } from "react-icons/io5";
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
            // Cria usuário no Auth
            const result = await createUserWithEmailAndPassword(auth, email, senha);

            // Salva no Realtime Database com papel "admin"
            await set(ref(db, `users/${result.user.uid}`), {
                email: result.user.email,
                role: "admin",
                createdAt: new Date().toISOString(),
            });

            // Atualiza AuthContext
            if (setUser) setUser(result.user);
            if (setIsAdmin) setIsAdmin(true);

            setSuccessMsg("✅ Conta criada com sucesso! Você já é admin.");

            // Redireciona após 1,5s
            setTimeout(() => router.push("/"), 1500);
        } catch (error: any) {
            setErrorMsg(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.div
                className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-6"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
            >
                <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">
                    Criar Conta de Admin
                </h2>

                <form onSubmit={handleRegister} className="flex flex-col gap-5">
                    {/* Campo Email */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-600">E-mail</label>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="exemplo@dominio.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                            />
                        </div>
                    </div>

                    {/* Campo Senha */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-600">Senha</label>
                        <div className="relative">
                            <input
                                type={mostrarSenha ? "text" : "password"}
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                            />
                            <button
                                type="button"
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                                className="absolute right-1 top-1/9 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                            >
                                {mostrarSenha ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Mensagens de sucesso/erro */}
                    {errorMsg && <p className="text-red-600 text-sm text-center">{errorMsg}</p>}
                    {successMsg && <p className="text-green-600 text-sm text-center">{successMsg}</p>}

                    {/* Botão de cadastro */}
                    <motion.button
                        type="submit"
                        whileTap={{ scale: 0.97 }}
                        disabled={loading}
                        className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition shadow-md cursor-pointer"
                    >
                        {loading ? "Carregando..." : "Cadastrar"}
                    </motion.button>
                </form>

                <p className="text-gray-600 text-sm text-center">
                    Já tem conta?{" "}
                    <a
                        href="/admin-login"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Faça login
                    </a>
                </p>
            </motion.div>
        </motion.div>
    );
}
