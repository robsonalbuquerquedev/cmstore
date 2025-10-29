"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

export default function Feedback() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const sendFeedback = () => {
        let text = "💬 *Novo Feedback recebido pelo site CMStore:*\n\n";
        if (name) text += `👤 Nome: ${name}\n`;
        if (phone) text += `📱 Telefone: ${phone}\n`;
        if (message) text += `📝 Mensagem: ${message}\n`;

        const whatsappNumber = "5581971168633";
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");

        // ✅ Reseta os campos após o envio
        setName("");
        setPhone("");
        setMessage("");
    };

    return (
        <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-100 via-sky-100 to-blue-200 px-6 py-16">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-lg flex flex-col items-center text-center space-y-10"
            >
                <h1
                    className="text-4xl md:text-5xl font-extrabold tracking-tight"
                    style={{ color: "#004BAD" }}
                >
                    Envie seu Feedback 💙
                </h1>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        sendFeedback();
                    }}
                    className="w-full flex flex-col gap-6 text-left"
                >
                    {/* Campo Nome */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold mb-2">
                            Nome (opcional)
                        </label>
                        <input
                            type="text"
                            placeholder="Seu nome"
                            className="w-full p-4 rounded-2xl border border-blue-200 bg-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 text-gray-800 transition-all"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Campo Telefone */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold mb-2">
                            Telefone / WhatsApp (opcional)
                        </label>
                        <input
                            type="text"
                            placeholder="Digite seu telefone"
                            className="w-full p-4 rounded-2xl border border-blue-200 bg-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 text-gray-800 transition-all"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    {/* Campo Mensagem */}
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-semibold mb-2">
                            Mensagem
                        </label>
                        <textarea
                            placeholder="Conte-nos o que achou da sua experiência, deixe uma sugestão ou compartilhe como podemos melhorar 🌟"
                            className="w-full p-4 rounded-2xl border border-blue-200 bg-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 text-gray-800 transition-all resize-none"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={5}
                        />
                    </div>

                    {/* Botão Enviar */}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 text-white text-lg font-semibold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-3 hover:shadow-2xl transition-all"
                    >
                        <FaWhatsapp className="text-2xl" />
                        Enviar via WhatsApp
                    </motion.button>
                </form>

                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    Agradecemos por compartilhar sua opinião.
                    Ela nos ajuda a criar uma experiência cada vez mais leve ☁️
                </p>
            </motion.div>
        </main>
    );
}
    