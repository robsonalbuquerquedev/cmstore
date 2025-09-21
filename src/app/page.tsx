"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
}

// 👉 Setas personalizadas
function PrevArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-3 rounded-full shadow-md z-10"
    >
      <FaChevronLeft size={20} />
    </button>
  );
}

function NextArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-3 rounded-full shadow-md z-10"
    >
      <FaChevronRight size={20} />
    </button>
  );
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const AUTOPLAY_SPEED = 3500; // mesmo valor do autoplay do slider

  useEffect(() => {
    const productsRef = ref(db, "products");
    onValue(productsRef, (snapshot) => {
      const data: Record<string, Product> = snapshot.val() || {};
      const list = Object.keys(data).map((key) => ({ ...data[key], id: key }));
      setProducts(list);
    });
  }, []);

  // 👉 Controle da barra de progresso
  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 100 / (AUTOPLAY_SPEED / 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const toggleSelect = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const sendWish = () => {
    if (selectedProducts.length === 0) return alert("Selecione algum produto!");
    const message = selectedProducts
      .map((id) => {
        const p = products.find((prod) => prod.id === id);
        return `${p?.name} - R$ ${p?.price.toFixed(2)}`;
      })
      .join("\n");
    const url = `https://wa.me/5581971168633?text=${encodeURIComponent(
      "Olá! Tenho interesse nos produtos:\n" + message
    )}`;
    window.open(url, "_blank");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "40px",
    autoplay: true,
    autoplaySpeed: AUTOPLAY_SPEED,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: () => setProgress(0),
    pauseOnHover: false,   // 🚀 não pausa ao passar o mouse
    pauseOnFocus: false,   // 🚀 não pausa ao clicar no carrossel
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, centerPadding: "30px" } },
      { breakpoint: 640, settings: { slidesToShow: 1, centerPadding: "20px" } },
    ],
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-6 bg-gradient-to-b from-gray-50 to-gray-100">
      <h1 className="text-4xl font-extrabold mb-10 text-gray-800 text-center">
        ✨ Nossos Principais Produtos
      </h1>

      <div className="relative w-full max-w-6xl">
        {/* Barra de progresso */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded transition-[width] duration-500 ease-in-out animate-pulse"
            style={{ width: `${progress}%` }}
          />
        </div>



        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="px-2 sm:px-3">
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-3 sm:p-5 flex flex-col items-center h-full border border-gray-100">

                {/* Imagem */}
                <div className="h-32 sm:h-48 w-full mb-3 sm:mb-4 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="object-contain transition-transform duration-300 hover:scale-105"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm sm:text-base">Sem Imagem</span>
                  )}
                </div>

                {/* Texto */}
                <h2 className="font-semibold text-base sm:text-lg text-center text-gray-800">
                  {product.name}
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 text-center mb-1 sm:mb-2 line-clamp-2">
                  {product.description}
                </p>
                <p className="font-bold text-blue-700 mb-2 sm:mb-3 text-sm sm:text-lg">
                  R$ {product.price.toFixed(2)}
                </p>

                {/* Botão de seleção */}
                <button
                  onClick={() => toggleSelect(product.id)}
                  className={`mt-auto flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition w-full sm:w-auto text-sm sm:text-base ${selectedProducts.includes(product.id)
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  <FaHeart
                    className={`text-lg sm:text-xl ${selectedProducts.includes(product.id)
                        ? "text-red-500 animate-pulse"
                        : "text-gray-400"
                      }`}
                  />
                  {selectedProducts.includes(product.id) ? "Adicionado" : "Adicionar"}
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Botão flutuante de enviar */}
      {selectedProducts.length > 0 && (
        <button
          onClick={sendWish}
          className="fixed bottom-6 right-6 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <FaHeart /> Enviar Lista de Desejos
        </button>
      )}
    </main>
  );
}
