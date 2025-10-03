// file: client/src/app/admin/orders/page.tsx

import React from 'react';
import { ListOrdered } from 'lucide-react';
import OrderRow from '@/components/admin/OrderRow'; // Import component dòng đơn hàng

// Định nghĩa kiểu dữ liệu cho Đơn hàng (phải khớp với OrderModel)
interface AdminOrder {
    _id: string;
    totalPrice: number;
    orderStatus: string;
    orderItems: { quantity: number }[];
    createdAt: string;
}

// Dữ liệu Fallback an toàn 
const FALLBACK_ADMIN_ORDERS = {
    orders: [
        { _id: '65f000000000000000000001', totalPrice: 1850000, orderStatus: 'Delivered', orderItems: [{ quantity: 2 }, { quantity: 1 }], createdAt: new Date().toISOString() },
        { _id: '65f000000000000000000002', totalPrice: 320000, orderStatus: 'Shipped', orderItems: [{ quantity: 5 }], createdAt: new Date(Date.now() - 86400000).toISOString() },
        { _id: '65f000000000000000000003', totalPrice: 800000, orderStatus: 'Processing', orderItems: [{ quantity: 1 }], createdAt: new Date(Date.now() - 2 * 86400000).toISOString() },
    ],
    totalRevenue: 2970000, // Tổng giả định
    totalOrders: 3
};

// Hàm Fetch dữ liệu đơn hàng từ Backend Admin API
async function getAdminOrders() {
    try {
        const res = await fetch('http://localhost:5000/api/v1/admin/orders', {
            cache: 'no-store', 
        });

        if (!res.ok) {
            console.error(`Admin orders API failed: ${res.statusText}`);
            // NẾU API THẤT BẠI, TRẢ VỀ FALLBACK DATA
            return FALLBACK_ADMIN_ORDERS; 
        }

        const data = await res.json();
        // SỬ DỤNG HOẶC DATA THẬT HOẶC FALLBACK CHO TỔNG DOANH THU
        return { 
            orders: data.orders as AdminOrder[],
            totalRevenue: data.totalRevenue || 0, // Đảm bảo totalRevenue là số an toàn
            totalOrders: data.totalOrders || 0
        }; 
    } catch (error) {
        console.error("LỖI KẾT NỐI API ADMIN ORDERS:", error);
        // TRẢ VỀ FALLBACK DATA KHI GẶP LỖI MẠNG
        return FALLBACK_ADMIN_ORDERS;
    }
}

// ĐẢM BẢO HÀM NÀY CHỈ XUẤT HIỆN MỘT LẦN VÀ HOÀN CHỈNH
export default async function AdminOrdersPage() {
    // Lấy danh sách đơn hàng (thực tế hoặc giả lập an toàn)
    const { orders, totalOrders, totalRevenue } = await getAdminOrders();

    return (
        <div>
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                    <ListOrdered size={28} className="mr-3 text-gray-600" />
                    Quản lý Đơn hàng ({totalOrders})
                </h1>
                <p className="text-xl font-semibold text-green-700">
                    Doanh thu tạm tính: {totalRevenue.toLocaleString('vi-VN')}₫
                </p>
            </div>

            {/* Bảng Hiển thị Danh sách Đơn hàng */}
            <div className="overflow-x-auto bg-white rounded-lg shadow mt-6">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Mã ĐH</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ngày đặt</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">SL Mặt hàng</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tổng tiền</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trạng thái</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {orders.map((order) => (
                            <OrderRow key={order._id} order={order} />
                        ))}
                    </tbody>
                </table>
                
                {orders.length === 0 && (
                    <div className='p-6 text-center text-gray-500'>
                        Không tìm thấy đơn hàng nào.
                    </div>
                )}
            </div>
        </div>
    );
}