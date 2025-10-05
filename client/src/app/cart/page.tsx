"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingCart, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart();

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (totalQuantity === 0) {
    return (
      <div className="p-6 text-center">
        <ShoppingCart className="w-12 h-12 mx-auto text-gray-400" />
        <p className="mt-4 text-lg text-gray-600">Giỏ hàng của bạn đang trống.</p>
        <Link
          href="/products"
          className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Mua sắm ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Giỏ hàng</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center space-x-4">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
              )}
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">{item.price.toLocaleString()} ₫</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => decreaseQuantity(item.id)}
                className="p-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => increaseQuantity(item.id)}
                className="p-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="text-right">
              <p className="font-semibold">
                {(item.price * item.quantity).toLocaleString()} ₫
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="mt-1 text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> Xóa
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div>
          <p className="text-gray-600">
            Tổng sản phẩm: <span className="font-semibold">{totalQuantity}</span>
          </p>
          <p className="text-lg font-bold">
            Tổng tiền: {totalAmount.toLocaleString()} ₫
          </p>
        </div>
        <div className="space-x-2">
          <button
            onClick={clearCart}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Xóa tất cả
          </button>
          <Link
            href="/checkout"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Thanh toán
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

