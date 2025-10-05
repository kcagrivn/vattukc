// client/src/app/admin/orders/[id]/page.tsx
import React from "react";

interface OrderDetailPageProps {
  params: {
    id: string;
  };
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = params;

  // Gọi API nếu cần, ví dụ:
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`);
  // const order = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Chi tiết đơn hàng</h1>
      <p>Mã đơn hàng: {id}</p>
      {/* <pre>{JSON.stringify(order, null, 2)}</pre> */}
    </div>
  );
}

