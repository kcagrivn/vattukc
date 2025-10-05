"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  // 🧠 Load sản phẩm từ localStorage khi mở trang
  useEffect(() => {
    const stored = localStorage.getItem("adminProducts");
    if (stored) setProducts(JSON.parse(stored));
  }, []);

  // 💾 Lưu lại khi danh sách sản phẩm thay đổi
  useEffect(() => {
    localStorage.setItem("adminProducts", JSON.stringify(products));
  }, [products]);

  // ➕ Thêm sản phẩm
  const addProduct = () => {
    if (!name || !price || !image) {
      alert("⚠️ Vui lòng nhập đầy đủ thông tin sản phẩm");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name,
      price: Number(price),
      image,
    };

    setProducts([...products, newProduct]);
    setName("");
    setPrice("");
    setImage("");
  };

  // 🗑️ Xóa sản phẩm
  const deleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Container>
          <h1 className="text-2xl font-bold mt-6 mb-4">🧰 Trang quản trị</h1>

          {/* Form thêm sản phẩm */}
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-3">Thêm sản phẩm</h2>
            <div className="grid gap-3 md:grid-cols-3">
              <input
                type="text"
                placeholder="Tên sản phẩm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded px-3 py-2 text-sm"
              />
              <input
                type="number"
                placeholder="Giá"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border rounded px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="URL ảnh"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="border rounded px-3 py-2 text-sm"
              />
            </div>
            <button
              onClick={addProduct}
              className="mt-3 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded font-semibold"
            >
              ➕ Thêm
            </button>
          </div>

          {/* Danh sách sản phẩm */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Danh sách sản phẩm</h2>
            {products.length === 0 ? (
              <p className="text-gray-500">Chưa có sản phẩm nào.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="border rounded-lg shadow-sm overflow-hidden bg-white"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-28 object-cover"
                    />
                    <div className="p-2 text-sm">
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-green-600 font-bold">
                        {p.price.toLocaleString()}đ
                      </div>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="mt-1 text-red-500 text-xs hover:underline"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

