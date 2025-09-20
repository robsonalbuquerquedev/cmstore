"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get } from "firebase/database";
import { useAuth } from "@/contexts/AuthContext";
import { auth, db } from "@/lib/firebase";

export default function AdminLogin() {
    const router = useRouter();
    const { setUser, setIsAdmin } = useAuth();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        try {
            const result = await signInWithEmailAndPassword(auth, email, senha);

            // Atualiza contexto
            if (setUser) setUser(result.user);

            const snapshot = await get(ref(db, `users/${result.user.uid}`));
            const role = snapshot.exists() ? snapshot.val().role : null;
            if (setIsAdmin) setIsAdmin(role === "admin");

            // Redireciona
            router.push("/");
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMsg(error.message);
            } else {
                setErrorMsg("Ocorreu um erro inesperado");
            }
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
                    Login Administrativo
                </h2>

                <form onSubmit={handleEmailLogin} className="flex flex-col gap-5">
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

                    {/* Mensagem de erro */}
                    {errorMsg && (
                        <p className="text-red-600 text-sm text-center">{errorMsg}</p>
                    )}

                    {/* Botão de login */}
                    <motion.button
                        type="submit"
                        whileTap={{ scale: 0.97 }}
                        disabled={loading}
                        className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition shadow-md cursor-pointer"
                    >
                        {loading ? "Carregando..." : "Entrar"}
                    </motion.button>
                </form>

                <p className="text-gray-600 text-sm text-center">
                    Ainda não tem conta?{" "}
                    <a
                        href="/admin-register"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Cadastre-se aqui
                    </a>
                </p>
            </motion.div>
        </motion.div>
    );
}
