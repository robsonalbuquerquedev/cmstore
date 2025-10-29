"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaUser, FaPhone, FaPaperPlane } from "react-icons/fa";

export default function FeedbackPage() {
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
        <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-100 via-blue-50 to-sky-200 px-6 py-24 text-center">
            {/* 🔹 Cabeçalho */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
            >
                <h1 className="text-5xl font-extrabold mb-4">
                    <span style={{ color: "#0253DB" }}>ENVIE</span>{" "}
                    <span style={{ color: "#FBE062" }}>SEU</span>{" "}
                    <span style={{ color: "#014DAF" }}>FEEDBACK</span>
                </h1>
                <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                    Sua opinião é muito importante para nós!
                    Conte-nos como foi sua experiência e nos ajude a melhorar continuamente. 💙
                </p>
            </motion.div>

            {/* 🔹 Formulário sem fundo branco */}
            <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full max-w-2xl text-left space-y-8"
                onSubmit={(e) => {
                    e.preventDefault();
                    sendFeedback();
                }}
            >
                {/* Nome */}
                <div>
                    <label className="block font-semibold text-[#004BAD] mb-2">
                        Nome
                    </label>
                    <div className="flex items-center gap-2 bg-white/50 rounded-xl shadow-sm px-4 py-2 border border-blue-100 focus-within:ring-2 focus-within:ring-[#004BAD]/30">
                        <FaUser className="text-[#004BAD]" />
                        <input
                            type="text"
                            placeholder="Seu nome completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* Telefone */}
                <div>
                    <label className="block font-semibold text-[#004BAD] mb-2">
                        Telefone (opcional)
                    </label>
                    <div className="flex items-center gap-2 bg-white/50 rounded-xl shadow-sm px-4 py-2 border border-blue-100 focus-within:ring-2 focus-within:ring-[#004BAD]/30">
                        <FaPhone className="text-[#004BAD]" />
                        <input
                            type="tel"
                            placeholder="(DDD) 99999-9999"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* Mensagem */}
                <div>
                    <label className="block font-semibold text-[#004BAD] mb-2">
                        Mensagem
                    </label>
                    <textarea
                        placeholder="Conte-nos o que achou da sua experiência, deixe uma sugestão ou compartilhe como podemos melhorar."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={6}
                        className="w-full bg-white/50 rounded-xl shadow-sm border border-blue-100 px-4 py-3 outline-none text-gray-700 placeholder-gray-500 resize-none focus:ring-2 focus:ring-[#004BAD]/30"
                    />
                </div>

                {/* Botão enviar */}
                <div className="text-center pt-4">
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 bg-[#004BAD] hover:bg-[#003b8a] text-white px-8 py-3 rounded-full font-semibold shadow-lg transition"
                    >
                        <FaPaperPlane /> Enviar Feedback
                    </motion.button>
                </div>
            </motion.form>

            {/* Rodapé suave */}
            <p className="text-sm text-gray-600 mt-12">
                Agradecemos por dedicar um momento para compartilhar sua experiência 💛
            </p>
        </main>
    );
}
