import React from "react";

interface OrderDetailParams {
  id: string;
}

export default function OrderDetailPage({ params }: { params: OrderDetailParams }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Chi tiết đơn hàng</h1>
      <p>ID đơn hàng: {params.id}</p>
    </div>
  );
}

