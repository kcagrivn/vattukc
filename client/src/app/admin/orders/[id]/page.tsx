import React from "react";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = params;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Chi tiết đơn hàng</h1>
      <p>Mã đơn hàng: {id}</p>
    </div>
  );
}

