"use client";

import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";

const products = [
  {
    id: 1,
    name: "Béc tưới nhỏ giọt",
    price: 3000,
    category: "Béc tưới",
    description:
      "Béc tưới nhỏ giọt phù hợp cho cây trồng trong chậu, luống rau nhỏ. Tiết kiệm nước, dễ lắp đặt.",
    image:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    name: "Béc phun mưa mini",
    price: 3950,
    category: "Phun sương",
    description:
      "Phun tơi mịn, phù hợp cho vườn nhỏ và nhà lưới. Lưu lượng ổn định, dễ vệ sinh.",
    image:
      "https://images.unsplash.com/photo-1620803377086-95237a8de92e?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Béc cánh đập 1 tia",
    price: 19999,
    category: "Béc tưới",
    description:
      "Béc tưới cánh đập 1 tia bằng hợp kim nhôm, bán kính phun xa 10–20m, điều chỉnh góc dễ dàng.",
    image:
      "https://images.unsplash.com/photo-1562158070-0a2b66b238e3?auto=format&fit=crop&w=800&q=60",
  },
];

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const productId = Number(params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Container>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {/* Ảnh sản phẩm */}
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full rounded-lg object-cover"
              />
            </div>

            {/* Thông tin sản phẩm */}
            <div>
              <h1 className="text-2xl font-bold text-green-700">{product.name}</h1>
              <div className="text-lg text-green-600 font-semibold mt-2">
                {product.price.toLocaleString()}đ
              </div>
              <div className="text-sm text-gray-500 mt-1">{product.category}</div>

              <p className="mt-4 text-gray-700 leading-relaxed">
                {product.description}
              </p>

              {/* 🛒 Nút thêm vào giỏ */}
              <button
                onClick={() => {
                  const stored = localStorage.getItem("cart");
                  let currentCart: any[] = stored ? JSON.parse(stored) : [];
                  const existing = currentCart.find(
                    (item) => item.id === product.id
                  );

                  if (existing) {
                    existing.quantity += 1;
                  } else {
                    currentCart.push({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      quantity: 1,
                    });
                  }

                  localStorage.setItem("cart", JSON.stringify(currentCart));
                  alert("✅ Đã thêm vào giỏ hàng!");
                }}
                className="mt-6 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold transition w-full md:w-auto"
              >
                🛒 Thêm vào giỏ
              </button>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

