"use client";

import React, { useEffect, useState } from "react";
import { ListOrdered } from "lucide-react";
import OrderRow from "@/components/admin/OrderRow";
import { AdminOrder } from "@/types/order"; // ✅ Import type dùng chung

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);

  useEffect(() => {
    // 📌 Tạm thời dùng dữ liệu demo — sau này sẽ thay bằng API thật
    const demoOrders: AdminOrder[] = [
      {
        _id: "1",
        customerName: "Nguyễn Văn A",
        totalAmount: 150000,
        status: "Đang xử lý",
      },
      {
        _id: "2",
        customerName: "Trần Thị B",
        totalAmount: 250000,
        status: "Hoàn thành",
      },
    ];
    setOrders(demoOrders);
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <ListOrdered className="w-6 h-6 mr-2 text-green-600" />
        <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mã đơn
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Khách hàng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tổng tiền
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <OrderRow key={order._id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

