import React from "react";

// 👉 Gợi ý: bạn có thể tạo type riêng sau này ở src/types/product.ts
interface AdminProduct {
  _id: string;
  name: string;
  price: number;
  stock?: number;
  category?: string;
}

interface ProductRowProps {
  product: AdminProduct;
}

export default function ProductRow({ product }: ProductRowProps) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {product._id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {product.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {product.price.toLocaleString()} ₫
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {product.stock ?? 0}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-green-600 hover:text-green-900">Sửa</button>
      </td>
    </tr>
  );
}

