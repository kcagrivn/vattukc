import React from "react";
import { AdminOrder } from "@/types/order";

interface OrderRowProps {
  order: AdminOrder;
}

export default function OrderRow({ order }: OrderRowProps) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {order._id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {order.customerName || "—"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {order.totalAmount?.toLocaleString() || 0} ₫
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {order.status || "Chưa xác định"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-green-600 hover:text-green-900">Xem</button>
      </td>
    </tr>
  );
}

