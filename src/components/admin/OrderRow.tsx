import React from 'react'

interface AdminOrder {
  _id: string
  customerName: string
  totalAmount: number
  status: string
  // 👉 Thêm các trường bạn đang dùng thực tế ở đây
}

interface OrderRowProps {
  order: AdminOrder
}

export default function OrderRow({ order }: OrderRowProps) {
  return (
    <tr>
      <td>{order.customerName}</td>
      <td>{order.totalAmount}</td>
      <td>{order.status}</td>
    </tr>
  )
}

