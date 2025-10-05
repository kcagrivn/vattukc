"use client";

import React from "react";

const FilterBar: React.FC = () => {
  console.log("[DEBUG: FilterBar] Rendered");
  
  return (
    <div className="bg-gray-100 border-b p-3 flex justify-between items-center">
      <span className="text-sm text-gray-700">
        Bộ lọc sản phẩm sẽ nằm ở đây (có thể thêm sau)
      </span>
      <button
        className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
        onClick={() => console.log("[DEBUG: FilterBar] Bấm nút lọc")}
      >
        Lọc
      </button>
    </div>
  );
};

export default FilterBar;

