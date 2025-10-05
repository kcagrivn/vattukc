"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

const ProductPage: React.FC<{ params: { slug: string } }> = ({ params }) => {
  const { addToCart } = useCart();

  // ⚠ Tạm demo, sau này sẽ fetch từ API dựa trên slug
  const product: Product = {
    id: params.slug,
    name: "Sản phẩm demo",
    price: 99000,
    image: "/demo.jpg",
    description: "Mô tả ngắn sản phẩm",
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
    alert("Đã thêm vào giỏ hàng!");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex space-x-6">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="rounded-md object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <p className="text-lg font-semibold text-green-600 mb-4">
            {product.price.toLocaleString()} ₫
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

