const products = [
  {
    id: 1,
    name: "Béc tưới nhỏ giọt",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    name: "Béc phun mưa mini",
    price: 3950,
    image:
      "https://images.unsplash.com/photo-1620803377086-95237a8de92e?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Béc cánh đập 1 tia",
    price: 19999,
    image:
      "https://images.unsplash.com/photo-1562158070-0a2b66b238e3?auto=format&fit=crop&w=800&q=60",
  },
];

export default function FeaturedProducts() {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-3">Sản phẩm nổi bật</h2>
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-lg shadow-sm border hover:shadow-md transition cursor-pointer"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <div className="p-2">
              <div className="text-sm font-medium">{p.name}</div>
              <div className="text-green-600 font-bold mt-1">
                {p.price.toLocaleString()}đ
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

