"use client";

import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { ref, push, set, onValue, remove, update } from "firebase/database";
import Image from "next/image";

interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    stock?: number;
    image?: string;
}

interface ProductModalProps {
    product?: Product;
    onClose: () => void;
    onSave: (product: Product) => void;
}

/* 🪄 Modal estilizado */
function ProductModal({ product, onClose, onSave }: ProductModalProps) {
    const [name, setName] = useState(product?.name || "");
    const [description, setDescription] = useState(product?.description || "");
    const [price, setPrice] = useState(product?.price || 0);
    const [stock, setStock] = useState(product?.stock || 0);
    const [image, setImage] = useState(product?.image || "");

    const handleSave = () => {
        onSave({ ...product, name, description, price, stock, image } as Product);
        onClose();
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
                <div className="px-6 py-5 border-b border-blue-100 flex justify-between items-center bg-gradient-to-r from-blue-600 via-sky-500 to-blue-400 text-white">
                    <h2 className="text-xl md:text-2xl font-bold">
                        {product?.id ? "Editar Produto" : "Adicionar Produto"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-white/90 hover:text-yellow-200 text-2xl font-bold"
                    >
                        &times;
                    </button>
                </div>

                <div className="px-6 py-6 space-y-5">
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">
                            Nome
                        </label>
                        <input
                            type="text"
                            placeholder="Nome do produto"
                            className="w-full p-4 rounded-2xl border border-blue-200 bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">
                            Descrição
                        </label>
                        <textarea
                            placeholder="Breve descrição sobre o produto..."
                            className="w-full p-4 rounded-2xl border border-blue-200 bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">
                                Preço (R$)
                            </label>
                            <input
                                type="number"
                                placeholder="0.00"
                                className="w-full p-4 rounded-2xl border border-blue-200 bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />
                        </div>

                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">
                                Estoque
                            </label>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setStock(Math.max(stock - 1, 0))}
                                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                                >
                                    -
                                </button>
                                <span className="font-semibold text-gray-800">{stock}</span>
                                <button
                                    onClick={() => setStock(stock + 1)}
                                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">
                            URL da Imagem (opcional)
                        </label>
                        <input
                            type="text"
                            placeholder="https://..."
                            className="w-full p-4 rounded-2xl border border-blue-200 bg-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-blue-100 flex justify-end gap-4 bg-blue-50">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-300 rounded-xl hover:bg-gray-400 transition font-semibold"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md transition font-semibold"
                    >
                        Salvar
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

/* 🌈 Página principal */
export default function Produtos() {
    const { isAdmin } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalProduct, setModalProduct] = useState<Product | undefined>(
        undefined
    );
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

    useEffect(() => {
        const productsRef = ref(db, "products");
        onValue(productsRef, (snapshot) => {
            const data = snapshot.val() || {};
            const list = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
            list.sort((a, b) => (a.id > b.id ? 1 : -1));
            setProducts(list);
            setLoading(false);
        });
    }, []);

    const addProduct = (product: Product) => {
        const productsRef = ref(db, "products");
        const newProductRef = push(productsRef);
        set(newProductRef, { ...product });
    };

    const editProduct = (product: Product) => {
        if (!product.id) return;
        const productRef = ref(db, `products/${product.id}`);
        update(productRef, { ...product });
    };

    const deleteProduct = (id: string) => {
        if (confirm("Deseja remover este produto?")) {
            const productRef = ref(db, `products/${id}`);
            remove(productRef);
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedProducts((prev) =>
            prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
        );
    };

    const sendWish = () => {
        if (selectedProducts.length === 0)
            return alert("Selecione ao menos um produto!");
        const message = selectedProducts
            .map((id) => {
                const p = products.find((prod) => prod.id === id);
                return `- ${p?.name} (R$ ${p?.price.toFixed(2)})`;
            })
            .join("\n");
        window.open(
            `https://wa.me/5581971168633?text=${encodeURIComponent(
                "Olá! Tenho interesse nos seguintes produtos:\n" + message
            )}`,
            "_blank"
        );
        setSelectedProducts([]);
    };

    if (loading)
        return (
            <div className="min-h-screen flex justify-center items-center text-blue-700 text-lg">
                Carregando produtos...
            </div>
        );

    const indexOfLastProduct = currentPage * productsPerPage;
    const currentProducts = products.slice(
        indexOfLastProduct - productsPerPage,
        indexOfLastProduct
    );
    const totalPages = Math.ceil(products.length / productsPerPage);

    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-100 via-sky-100 to-blue-200 px-6 py-16 flex flex-col items-center relative overflow-hidden">
            {/* Bolhas decorativas */}
            <div className="absolute top-10 left-10 w-24 h-24 bg-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-32 h-32 bg-yellow-200/30 rounded-full blur-3xl animate-pulse"></div>

            {/* Título */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-extrabold mb-10 tracking-tight text-center"
                style={{ color: "#004BAD" }}
            >
                Nossos <span style={{ color: "#FEE05B" }}>Produtos</span> 🌤️
            </motion.h1>

            {/* Grid de Produtos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center w-full max-w-6xl">
                {currentProducts.map((product) => (
                    <motion.div
                        key={product.id}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl hover:shadow-2xl p-6 w-72 flex flex-col items-center text-center border border-blue-100 transition-all"
                    >
                        <div className="h-48 w-full mb-4 bg-white/40 flex items-center justify-center rounded-2xl overflow-hidden shadow-inner">
                            {product.image ? (
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={300}
                                    height={300}
                                    className="object-contain h-full w-full"
                                />
                            ) : (
                                <span className="text-gray-400">Sem Imagem</span>
                            )}
                        </div>

                        <h2 className="font-bold text-lg text-gray-800">{product.name}</h2>
                        <p className="text-sm text-gray-600 mt-1 flex-grow">
                            {product.description}
                        </p>
                        <p className="text-lg font-semibold text-blue-700 mt-3">
                            R$ {product.price.toFixed(2)}
                        </p>
                        <p className="text-gray-500 text-sm">Estoque: {product.stock}</p>

                        {isAdmin ? (
                            <div className="flex gap-2 mt-4 w-full">
                                <button
                                    onClick={() => setModalProduct(product)}
                                    className="flex-1 bg-yellow-500 text-white py-2 rounded-xl hover:bg-yellow-600 transition flex items-center justify-center gap-1 shadow"
                                >
                                    <FaEdit /> Editar
                                </button>
                                <button
                                    onClick={() => product.id && deleteProduct(product.id)}
                                    className="flex-1 bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition flex items-center justify-center gap-1 shadow"
                                >
                                    <FaTrash /> Remover
                                </button>
                            </div>
                        ) : (
                            <motion.label
                                className="flex items-center gap-2 mt-4 cursor-pointer text-sm font-medium text-gray-700 hover:text-blue-700 transition"
                                animate={{
                                    scale: selectedProducts.includes(product.id) ? [1, 1.15, 1] : 1,
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedProducts.includes(product.id)}
                                    onChange={() => toggleSelect(product.id)}
                                    className="accent-blue-600"
                                />
                                Adicionar à Lista de Desejos
                                <FaHeart
                                    className={`text-red-500 ${selectedProducts.includes(product.id)
                                            ? "animate-pulse"
                                            : "opacity-60"
                                        }`}
                                />
                            </motion.label>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Botão Lista de Desejos */}
            {!isAdmin && (
                <motion.button
                    onClick={sendWish}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="mt-10 px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-sky-400 text-white text-lg font-semibold rounded-2xl shadow-xl flex items-center justify-center gap-3 hover:shadow-2xl transition-all"
                >
                    <FaHeart className="text-2xl text-yellow-200" />
                    Enviar Lista de Desejos
                </motion.button>
            )}

            {/* Paginação */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${page === currentPage
                                    ? "bg-blue-600 text-white shadow-lg"
                                    : "bg-white/60 hover:bg-white text-blue-700 border border-blue-200"
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}

            {/* Botão Flutuante */}
            {isAdmin && (
                <motion.button
                    onClick={() =>
                        setModalProduct({
                            name: "",
                            description: "",
                            price: 0,
                            stock: 0,
                            image: "",
                        } as Product)
                    }
                    whileHover={{ scale: 1.1 }}
                    className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 via-sky-500 to-blue-400 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-300 flex items-center justify-center text-xl"
                    title="Adicionar Produto"
                >
                    <FaPlus />
                </motion.button>
            )}

            {/* Modal */}
            <AnimatePresence>
                {modalProduct && (
                    <ProductModal
                        product={modalProduct}
                        onClose={() => setModalProduct(undefined)}
                        onSave={(prod: Product) =>
                            prod.id ? editProduct(prod) : addProduct(prod)
                        }
                    />
                )}
            </AnimatePresence>
        </main>
    );
}
