"use client";

import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import { ref, push, set, onValue, remove, update } from "firebase/database";
import Image from "next/image";

interface Product {
    id: string; // sem ? — sempre precisa existir
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

// Modal para adicionar/editar produtos
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-transform duration-300 scale-100">
                <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {product?.id ? "Editar Produto" : "Adicionar Produto"}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-xl font-bold">&times;</button>
                </div>

                <div className="px-6 py-4 space-y-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Nome</label>
                        <input
                            type="text"
                            placeholder="Nome do produto"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Descrição</label>
                        <textarea
                            placeholder="Descrição do produto"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Preço (R$)</label>
                            <input
                                type="number"
                                placeholder="0.00"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">Estoque</label>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setStock(Math.max(stock - 1, 0))}
                                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                                >
                                    -
                                </button>
                                <span className="font-semibold">{stock}</span>
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
                        <label className="block text-gray-700 font-semibold mb-1">URL da Imagem (opcional)</label>
                        <input
                            type="text"
                            placeholder="https://..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition font-semibold"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Produtos() {
    const { isAdmin } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalProduct, setModalProduct] = useState<Product | undefined>(undefined);
    const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

    useEffect(() => {
        const productsRef = ref(db, "products");
        onValue(productsRef, (snapshot) => {
            const data = snapshot.val() || {};
            const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
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
        if (selectedProducts.includes(id)) {
            setSelectedProducts(selectedProducts.filter(pid => pid !== id));
        } else {
            setSelectedProducts([...selectedProducts, id]);
        }
    };

    const sendWish = () => {
        if (selectedProducts.length === 0) return alert("Selecione ao menos um produto!");
        const message = selectedProducts.map(id => {
            const p = products.find(prod => prod.id === id);
            return `- ${p?.name} (R$ ${p?.price.toFixed(2)})`;
        }).join("\n");
        window.open(`https://wa.me/5581971168633?text=${encodeURIComponent("Olá! Tenho interesse nos seguintes produtos:\n" + message)}`, "_blank");
        setSelectedProducts([]);
    };

    if (loading) return <p className="p-8 text-center">Carregando produtos...</p>;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(products.length / productsPerPage);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-6 relative">

            {/* Grid de produtos centralizado */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                {currentProducts.map(product => (
                    <motion.div
                        key={product.id}
                        className="bg-white rounded-lg shadow hover:shadow-xl transition p-4 flex flex-col w-64"
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="h-40 w-full mb-4 bg-gray-100 flex items-center justify-center rounded overflow-hidden">
                            {product.image ? (
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={300}         // largura da imagem (px)
                                    height={300}        // altura da imagem (px)
                                    className="object-contain h-full w-full"
                                />
                            ) : (
                                <span className="text-gray-400">Sem Imagem</span>
                            )}
                        </div>
                        
                        <h2 className="font-bold text-lg">{product.name}</h2>
                        <p className="text-sm mb-2 flex-grow">{product.description}</p>
                        <p className="font-semibold mb-1">R$ {product.price.toFixed(2)}</p>
                        <p className="text-gray-500 mb-2">Estoque: {product.stock}</p>

                        {isAdmin ? (
                            <div className="flex gap-2 mt-auto">
                                <button onClick={() => setModalProduct(product)} className="flex-1 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600 flex items-center justify-center gap-1">
                                    <FaEdit /> Editar
                                </button>
                                <button
                                    onClick={() => product.id && deleteProduct(product.id)}
                                    className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 flex items-center justify-center gap-1"
                                >
                                    <FaTrash /> Remover
                                </button>
                            </div>
                        ) : (
                            <motion.label
                                className="flex items-center gap-2 mt-auto cursor-pointer"
                                animate={{ scale: selectedProducts.includes(product.id) ? [1, 1.3, 1] : 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedProducts.includes(product.id)}
                                    onChange={() => toggleSelect(product.id)}
                                    className="accent-blue-600"
                                />
                                Adicionar à Lista de Desejos
                                <FaHeart className={`text-red-500 ${selectedProducts.includes(product.id) ? 'animate-pulse' : ''}`} />
                            </motion.label>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Botão enviar lista de desejos */}
            {!isAdmin && (
                <button
                    onClick={sendWish}
                    className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                    <FaHeart /> Enviar Lista de Desejos
                </button>
            )}

            {/* Paginação estilo loja profissional */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">

                    {/* Botão Primeira */}
                    <button
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition-colors"
                    >
                        &laquo; Primeiro
                    </button>

                    {/* Botão Anterior */}
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition-colors"
                    >
                        &lsaquo; Anterior
                    </button>

                    {/* Botões de página com elipses */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(page =>
                            page === 1 ||
                            page === totalPages ||
                            Math.abs(page - currentPage) <= 1
                        )
                        .map((page, index, array) => {
                            const prevPage = array[index - 1];
                            const showEllipsis = prevPage && page - prevPage > 1;
                            return (
                                <span key={page} className="flex items-center">
                                    {showEllipsis && <span className="px-2">...</span>}
                                    <button
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-4 py-2 rounded-full transition-colors font-semibold ${page === currentPage
                                            ? "bg-blue-600 text-white shadow-lg"
                                            : "bg-gray-200 hover:bg-gray-300"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                </span>
                            );
                        })}

                    {/* Botão Próxima */}
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition-colors"
                    >
                        Próxima &rsaquo;
                    </button>

                    {/* Botão Última */}
                    <button
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition-colors"
                    >
                        Última &raquo;
                    </button>
                </div>
            )}

            {/* Botão flutuante de adicionar produto */}
            {isAdmin && (
                <button
                    onClick={() =>
                        setModalProduct({
                            name: "",
                            description: "",
                            price: 0,
                            stock: 0,
                            image: ""
                        } as Product) // você pode usar "as Product" ou criar um tipo NewProduct
                    }
                    className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 flex items-center justify-center text-xl"
                    title="Adicionar Produto"
                >
                    <FaPlus />
                </button>
            )}

            {/* Modal */}
            {modalProduct && (
                <ProductModal
                    product={modalProduct}
                    onClose={() => setModalProduct(undefined)}
                    onSave={(prod: Product) => (prod.id ? editProduct(prod) : addProduct(prod))}
                />
            )}
        </div>
    );
}
