// file: client/src/components/admin/OrderRow.tsx

"use client";
import React from 'react';
import { Truck, Eye } from 'lucide-react';
import Link from 'next/link';

// Định nghĩa kiểu dữ liệu cho Đơn hàng (phải khớp với OrderModel)
interface Order {
    _id: string;
    totalPrice: number;
    orderStatus: string;
    orderItems: { quantity: number }[];
    createdAt: string;
}

interface OrderRowProps {
    order: Order;
}

// Hàm format ngày tháng (ví dụ: 2025-10-03)
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};

const OrderRow: React.FC<OrderRowProps> = ({ order }) => {
    // Hàm xác định màu sắc trạng thái
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Shipped': return 'bg-blue-100 text-blue-800';
            case 'Processing': return 'bg-yellow-100 text-yellow-800';
            case 'Canceled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const totalQuantity = order.orderItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <tr className="border-b hover:bg-gray-50 transition-colors">
            {/* ID Đơn hàng (Mã đơn hàng) */}
            <td className="px-4 py-3 font-medium text-gray-600 text-xs">
                {order._id.substring(0, 8)}...
            </td>
            
            {/* Ngày đặt */}
            <td className="px-4 py-3 text-sm text-gray-500">
                {formatDate(order.createdAt)}
            </td>

            {/* Số lượng mặt hàng */}
            <td className="px-4 py-3 text-sm text-center">
                {totalQuantity}
            </td>

            {/* Tổng tiền */}
            <td className="px-4 py-3 text-sm text-red-600 font-semibold">
                {order.totalPrice.toLocaleString('vi-VN')}₫
            </td>
            
            {/* Trạng thái */}
            <td className="px-4 py-3 text-sm">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus}
                </span>
            </td>
            
            {/* Hành động */}
            <td className="px-4 py-3 text-center">
                <div className="flex items-center space-x-3 justify-center">
                    {/* Nút Chi tiết */}
                    <Link href={`/admin/orders/${order._id}`} 
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title='Xem chi tiết'>
                        <Eye size={18} />
                    </Link>
                    
                    {/* Nút Cập nhật Trạng thái */}
                    <button 
                        className="text-green-600 hover:text-green-800 transition-colors"
                        title='Cập nhật trạng thái'>
                        <Truck size={18} />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default OrderRow;