// file: client/src/app/checkout/page.tsx

"use client";
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { Truck, CreditCard, DollarSign } from 'lucide-react';

const CheckoutPage: React.FC = () => {
    const { items, totalAmount, totalQuantity, clearCart } = useCart(); // Thêm clearCart
    
    // State cho thông tin giao hàng
    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        phone: '',
        address: '',
        city: '',
    });
    
    // State cho phương thức thanh toán
    const [paymentMethod, setPaymentMethod] = useState('cod'); // cod: Cash on Delivery

    // Hàm xử lý thay đổi form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setShippingInfo({
            ...shippingInfo,
            [e.target.name]: e.target.value
        });
    };

    // Hàm xử lý Đặt hàng (Logic giả lập)
    // Hàm xử lý Đặt hàng (Logic gửi API)
    const handlePlaceOrder = async (e: React.FormEvent) => { // <-- THÊM 'async'
        e.preventDefault();
        
        if (totalQuantity === 0) {
            alert('Giỏ hàng trống. Vui lòng thêm sản phẩm.');
            return;
        }
        
        // 1. Chuẩn bị dữ liệu để gửi đi
        const orderData = {
            shippingInfo,
            // Chuyển đổi các mục trong giỏ hàng thành định dạng API cần
            orderItems: items.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                productId: item.productId,
            })),
            paymentMethod,
            itemsPrice: totalAmount, // Tổng tiền hàng hóa
            shippingPrice: 0, // Phí vận chuyển (Giả định 0)
            totalPrice: totalAmount,
        };

        // 2. GỌI API ĐẶT HÀNG
        try {
            const res = await fetch('http://localhost:5000/api/v1/order/new', { // <-- URL API MỚI
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (res.status === 201) {
                // Đặt hàng thành công
                alert(`ĐẶT HÀNG THÀNH CÔNG! Đơn hàng của bạn đã được ghi nhận.`);
                clearCart(); // Xóa giỏ hàng
            } else {
                const errorData = await res.json();
                alert(`LỖI ĐẶT HÀNG: ${errorData.message}`);
            }

        } catch (error) {
            alert('LỖI KẾT NỐI SERVER BACKEND. Vui lòng kiểm tra cổng 5000.');
        }
    };
    
    // Nếu giỏ hàng trống, chuyển hướng người dùng hoặc hiển thị thông báo
    if (totalQuantity === 0 && items.length === 0) {
        return (
            <div className="container mx-auto p-8 text-center min-h-[60vh] flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-700 mb-4">Cảm ơn bạn đã đặt hàng!</h1>
                <p className="text-gray-500 mb-6">Đơn hàng của bạn đã được ghi nhận.</p>
                <Link href="/" className="rounded-full bg-green-600 px-6 py-3 text-white font-medium hover:bg-green-700 transition-colors shadow-lg">
                    Quay về trang chủ
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold text-green-700 mb-8 border-b pb-3">
                Thanh toán Đơn hàng
            </h1>

            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Cột 1: Thông tin Giao hàng (2/3 diện tích) */}
                <div className="lg:col-span-2 space-y-6 bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 flex items-center">
                        <Truck size={20} className="mr-2 text-blue-500" />
                        1. Thông tin Vận chuyển
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" name="fullName" placeholder="Họ và Tên người nhận" required onChange={handleChange} className="p-3 border rounded-lg focus:ring-green-500 focus:border-green-500" />
                        <input type="tel" name="phone" placeholder="Số điện thoại" required onChange={handleChange} className="p-3 border rounded-lg focus:ring-green-500 focus:border-green-500" />
                    </div>
                    
                    <input type="text" name="address" placeholder="Địa chỉ chi tiết (Số nhà, đường...)" required onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-green-500 focus:border-green-500" />
                    
                    <select name="city" required onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-green-500 focus:border-green-500 text-gray-500">
                        <option value="">Chọn Tỉnh/Thành phố</option>
                        <option value="HCMC">TP. Hồ Chí Minh</option>
                        <option value="Hanoi">Hà Nội</option>
                        <option value="DakLak">Đắk Lắk</option>
                        {/* Thêm các tỉnh thành khác khi cần */}
                    </select>
                </div>

                {/* Cột 2: Phương thức Thanh toán & Tóm tắt (1/3 diện tích) */}
                <div className="lg:col-span-1 space-y-6">
                    
                    {/* Phần Phương thức Thanh toán */}
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">
                            2. Phương thức Thanh toán
                        </h2>
                        
                        <div className="space-y-4">
                            {/* Thanh toán khi nhận hàng (COD) */}
                            <div className="flex items-center">
                                <input type="radio" id="cod" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500" />
                                <label htmlFor="cod" className="ml-3 text-gray-700 font-medium flex items-center">
                                    <DollarSign size={18} className="mr-2 text-green-600" />
                                    Thanh toán khi nhận hàng (COD)
                                </label>
                            </div>
                            
                            {/* Thanh toán qua Thẻ/Ngân hàng */}
                            <div className="flex items-center">
                                <input type="radio" id="card" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500" />
                                <label htmlFor="card" className="ml-3 text-gray-700 font-medium flex items-center">
                                    <CreditCard size={18} className="mr-2 text-blue-500" />
                                    Thanh toán qua Thẻ/Ngân hàng
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Tóm tắt Đơn hàng */}
                    <div className="bg-white p-6 rounded-xl shadow-xl border border-green-200">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Tóm tắt Đơn hàng</h2>
                        <div className="space-y-3 text-gray-600 border-b pb-4">
                            {items.map(item => (
                                <div key={item.productId} className="flex justify-between text-sm italic">
                                    <span>{item.name} ({item.quantity})</span>
                                    <span>{(item.price * item.quantity).toLocaleString('vi-VN')}₫</span>
                                </div>
                            ))}
                            <div className="flex justify-between pt-2">
                                <span>Tạm tính:</span>
                                <span>{totalAmount.toLocaleString('vi-VN')}₫</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Phí vận chuyển:</span>
                                <span className='font-medium text-green-600'>Miễn phí</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center font-extrabold text-xl mt-4">
                            <span>TỔNG CỘNG:</span>
                            <span className='text-red-600'>{totalAmount.toLocaleString('vi-VN')}₫</span>
                        </div>
                        
                        {/* Nút Đặt hàng */}
                        <button
                            type="submit"
                            className="mt-6 w-full rounded-full bg-green-600 px-6 py-3 text-white font-bold text-lg shadow-green transition-colors duration-300 hover:bg-green-700"
                            disabled={totalQuantity === 0}
                        >
                            HOÀN TẤT ĐẶT HÀNG
                        </button>
                    </div>
                </div>
            </form>

            <div className='h-20'></div>
        </div>
    );
};

export default CheckoutPage;