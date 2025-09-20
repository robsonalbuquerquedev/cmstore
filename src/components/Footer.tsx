"use client";

import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const whatsappNumber = "5581971168633";
    const text = "Olá! Gostaria de falar com você"; // mensagem padrão
    const icons = [
        { icon: <FaInstagram />, link: "https://www.instagram.com/missao_cm/" },
        { icon: <FaWhatsapp />, link: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}` },
    ];
    
    return (
        <footer className="bg-blue-700 text-white mt-12">
            <div className="container mx-auto flex flex-col items-center justify-center py-8 px-6 md:px-10 gap-4">

                {/* Texto centralizado */}
                <p className="text-center text-sm md:text-base">
                    © {currentYear} Colo de Mãe. Todos os direitos reservados.
                </p>

                {/* Ícones centralizados abaixo do texto */}
                <div className="flex gap-6 mt-2">
                    {icons.map(({ icon, link }, index) => (
                        <a
                            key={index}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-blue-300 text-xl transition-colors"
                        >
                            {icon}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
