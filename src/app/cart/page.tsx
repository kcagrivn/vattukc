"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // 🧠 Load giỏ hàng từ localStorage khi mở trang
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  // 🧠 Cập nhật localStorage khi giỏ thay đổi
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 🧮 Tính tổng tiền
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 🗑️ Xóa sản phẩm
  const removeItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Container>
          <h1 className="text-2xl font-bold mt-4 mb-4">🛒 Giỏ hàng của bạn</h1>

          {cart.length === 0 ? (
            <p className="text-gray-500">Giỏ hàng trống.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border rounded-lg p-2 gap-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{item.name}</div>
                    <div className="text-green-600 font-bold text-sm">
                      {item.price.toLocaleString()}đ × {item.quantity}
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 text-sm font-semibold hover:underline"
                  >
                    Xóa
                  </button>
                </div>
              ))}

              <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                <div>Tổng cộng:</div>
                <div className="text-green-700">{total.toLocaleString()}đ</div>
              </div>

              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold">
                ✅ Tiến hành thanh toán
              </button>
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
}

