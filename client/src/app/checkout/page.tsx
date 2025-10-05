"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Đặt hàng:", { cart, shippingInfo, totalAmount });
    clearCart();
    alert("Đặt hàng thành công!");
  };

  if (totalQuantity === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg text-gray-600">Không có sản phẩm để thanh toán.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Thanh toán</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Họ và tên"
          value={shippingInfo.name}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Địa chỉ"
          value={shippingInfo.address}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Số điện thoại"
          value={shippingInfo.phone}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Xác nhận đặt hàng
        </button>
      </form>

      <div className="border-t pt-4">
        <p>Tổng sản phẩm: {totalQuantity}</p>
        <p className="font-bold text-lg">Tổng tiền: {totalAmount.toLocaleString()} ₫</p>
      </div>
    </div>
  );
};

export default CheckoutPage;

