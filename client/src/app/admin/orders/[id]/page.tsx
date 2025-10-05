import React from 'react';

interface OrderPageProps {
  params: {
    id: string;
  };
}

export default function OrderDetailPage({ params }: OrderPageProps) {
  const { id } = params;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Chi tiết đơn hàng</h1>
      <p>Mã đơn hàng: <strong>{id}</strong></p>
    </div>
  );
}

