const categories = [
  { id: 1, name: "Béc tưới", icon: "💧" },
  { id: 2, name: "Phân bón", icon: "🌿" },
  { id: 3, name: "Dụng cụ", icon: "🛠️" },
  { id: 4, name: "Phun sương", icon: "☁️" },
];

export default function Categories() {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-3">Danh mục</h2>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col items-center justify-center bg-green-50 rounded-lg p-2 text-center text-xs cursor-pointer hover:bg-green-100 transition"
          >
            <div className="text-2xl mb-1">{cat.icon}</div>
            <div>{cat.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

