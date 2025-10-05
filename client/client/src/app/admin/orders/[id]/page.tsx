import React from "react";

interface PageProps {
  params: {
    id: string;
  };
}

// ❌ KHÔNG cần tạo interface riêng tên OrderDetailPageProps nữa
// ✅ Next.js App Router sẽ tự động truyền params từ URL vào
export default async function OrderDetailPage({ params }: PageProps) {
  const { id } = params;

  // Ở đây bạn có thể fetch dữ liệu từ server nếu cần
  // const order = await fetchOrderById(id);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Chi tiết đơn hàng</h1>
      <p>ID đơn hàng: {id}</p>
    </div>
  );
}

