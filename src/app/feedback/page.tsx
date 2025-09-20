"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function Feedback() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const sendFeedback = () => {
        // Monta a mensagem para WhatsApp
        let text = "Olá! Recebi um feedback pelo site:\n";
        if (name) text += `Nome: ${name}\n`;
        if (phone) text += `Telefone: ${phone}\n`;
        if (message) text += `Mensagem: ${message}\n`;

        const whatsappNumber = "5581971168633"; // seu número
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Envie seu Feedback</h1>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1">Nome (opcional)</label>
                    <input
                        type="text"
                        placeholder="Seu nome"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1">Telefone/WhatsApp (opcional)</label>
                    <input
                        type="text"
                        placeholder="Digite seu telefone"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-1">Mensagem (opcional)</label>
                    <textarea
                        placeholder="Escreva sua sugestão ou dúvida..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={sendFeedback}
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
                    >
                        <FaWhatsapp /> Enviar via WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
}
