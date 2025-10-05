// file: client/src/app/admin/orders/[id]/page.tsx

import React from 'react';
import { Truck, CheckCircle, MapPin, Phone, DollarSign, ListOrdered, ArrowLeft, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Định nghĩa kiểu dữ liệu cho Order Items
interface OrderItem {
    name: string;
    quantity: number;
    price: number;
    productId: string;
}

// Định nghĩa kiểu dữ liệu cho Đơn hàng chi tiết
interface Order {
    _id: string;
    shippingInfo: {
        fullName: string;
        phone: string;
        address: string;
        city: string;
    };
    orderItems: OrderItem[];
    paymentMethod: string;
    totalPrice: number;
    orderStatus: string;
    createdAt: string;
}

// DỮ LIỆU GIẢ LẬP AN TOÀN (FALLBACK DATA)
const fallbackOrderData: Order = {
    _id: 'FALLBACK_ID',
    shippingInfo: { fullName: "Dữ liệu giả lập", phone: "0000000000", address: "Vui lòng kiểm tra Server", city: "NA" },
    orderItems: [
        { name: "Phân bón NPK (Giả lập)", quantity: 2, price: 650000, productId: 'p1' }
    ],
    paymentMethod: 'cod',
    totalPrice: 1300000,
    orderStatus: 'Processing',
    createdAt: new Date().toISOString(),
};

// Hàm Fetch Chi tiết Đơn hàng
async function getOrderDetails(id: string): Promise<Order> {
    try {
        // Gọi API Backend
        const res = await fetch(`http://localhost:5000/api/v1/admin/orders/${id}`, {
            cache: 'no-store', 
        });

        if (!res.ok) {
             // Ném lỗi để chuyển sang khối catch
             throw new Error(`Failed to fetch order details: ${res.statusText}`);
        }
        
        const data = await res.json();
        // Kiểm tra xem data.order có tồn tại không
        if (!data.order) {
            throw new Error("Order data is missing from API response.");
        }
        
        return data.order as Order;
        
    } catch (error) {
        console.error("LỖI KẾT NỐI API ADMIN ORDER DETAIL:", error);
        // TRẢ VỀ DỮ LIỆU GIẢ LẬP AN TOÀN KHI THẤT BẠI
        return fallbackOrderData; 
    }
}

// Hàm xác định màu sắc trạng thái
const getStatusColor = (status: string) => {
    switch (status) {
        case 'Delivered': return 'bg-green-600';
        case 'Shipped': return 'bg-blue-600';
        case 'Processing': return 'bg-yellow-600';
        default: return 'bg-gray-600';
    }
};


export default async function AdminOrderDetailPage({ params }: { params: { id: string } }) {
    // Lấy dữ liệu (sẽ là dữ liệu thật hoặc fallback data an toàn)
    const order = await getOrderDetails(params.id);
    
    // KHẮC PHỤC LỖI: Destructuring an toàn vì order hiện đã là Order hoặc fallbackOrderData
    const { shippingInfo, orderItems, totalPrice, orderStatus, paymentMethod, createdAt } = order;

    return (
        <div>
            <Link href="/admin/orders" className='text-blue-600 hover:underline flex items-center mb-6 text-sm'>
                <ArrowLeft size={16} className='mr-1' /> Quay lại Danh sách Đơn hàng
            </Link>

            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Đơn hàng #{order._id.substring(0, 8)}...
            </h1>
            
            {/* Tóm tắt và Trạng thái */}
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-8 border-l-4 border-green-500">
                <div className="space-y-1">
                    <p className="text-sm text-gray-600">Ngày đặt: {new Date(createdAt).toLocaleString('vi-VN')}</p>
                    <p className="text-2xl font-extrabold text-red-600">Tổng cộng: {totalPrice.toLocaleString('vi-VN')}₫</p>
                </div>
                <div className={`px-4 py-2 rounded-full font-bold text-white ${getStatusColor(orderStatus)}`}>
                    {orderStatus}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Cột 1: Thông tin Giao hàng */}
                <div className="md:col-span-1 bg-white p-6 rounded-lg shadow border-t-4 border-blue-500">
                    <h2 className="text-xl font-semibold mb-3 flex items-center"><MapPin size={20} className='mr-2 text-blue-500' /> Thông tin Giao hàng</h2>
                    <p className='font-medium'>{shippingInfo.fullName}</p>
                    <p className='text-sm text-gray-600 flex items-center mt-1'>
                        <Phone size={14} className='mr-1' /> {shippingInfo.phone}
                    </p>
                    <p className='text-sm text-gray-600 mt-2'>
                        {shippingInfo.address}, {shippingInfo.city}
                    </p>
                    <p className='text-sm text-gray-500 mt-3 font-semibold'>
                        Thanh toán: {paymentMethod === 'cod' ? 'COD (Tiền mặt)' : 'Thẻ/Ngân hàng'}
                    </p>
                </div>

                {/* Cột 2 & 3: Chi tiết Sản phẩm và Cập nhật Trạng thái */}
                <div className="md:col-span-2 space-y-6">
                    
                    {/* Danh sách Sản phẩm */}
                    <div className="bg-white p-6 rounded-lg shadow border-t-4 border-gray-500">
                        <h2 className="text-xl font-semibold mb-4 flex items-center"><ListOrdered size={20} className='mr-2 text-gray-500' /> Sản phẩm Đã đặt</h2>
                        
                        {orderItems.length === 0 ? (
                            <p className='text-center text-gray-500'>Không có mặt hàng nào (Lỗi dữ liệu).</p>
                        ) : (
                            orderItems.map((item, index) => (
                                <div key={index} className="flex justify-between items-center border-b py-2 text-sm">
                                    <span className='text-gray-700 font-medium flex items-center'>
                                        <ShoppingCart size={14} className='mr-1 text-green-500'/> {item.name} x {item.quantity}
                                    </span>
                                    <span className='text-red-600'>{(item.price * item.quantity).toLocaleString('vi-VN')}₫</span>
                                </div>
                            ))
                        )}
                    </div>
                    
                    {/* Cập nhật Trạng thái (Dành cho Admin) */}
                    <div className="bg-white p-6 rounded-lg shadow border-t-4 border-green-500">
                        <h2 className="text-xl font-semibold mb-4 flex items-center"><Truck size={20} className='mr-2 text-green-600' /> Cập nhật Trạng thái</h2>
                        
                        <div className='flex space-x-4 items-center'>
                            <select 
                                defaultValue={orderStatus}
                                className='p-3 border rounded-lg focus:ring-green-500 focus:border-green-500 text-gray-700 w-full md:w-1/2'>
                                <option value="Processing">Đang xử lý</option>
                                <option value="Shipped">Đã vận chuyển</option>
                                <option value="Delivered">Đã giao hàng</option>
                                <option value="Canceled">Hủy đơn hàng</option>
                            </select>
                            <button className='bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors'>
                                Cập nhật
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}