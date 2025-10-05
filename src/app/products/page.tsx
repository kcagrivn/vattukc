import { apiGet } from "@/lib/api";

export default async function ProductsPage() {
  // Gọi API thật để lấy danh sách sản phẩm
  const products = await apiGet("/api/products");

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🛍️ Danh sách sản phẩm từ API thật</h1>

      {products.length === 0 ? (
        <p>Không có sản phẩm nào.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p: any) => (
            <li
              key={p.id}
              className="border rounded-lg shadow-sm p-4 hover:shadow-md transition"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h2 className="font-semibold text-lg">{p.name}</h2>
              <p className="text-green-600 font-bold">
                {p.price.toLocaleString("vi-VN")} đ
              </p>
              <p className="text-sm text-gray-600">{p.category}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

