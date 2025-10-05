// file: client/src/app/cart/page.tsx

"use client"; // Bắt buộc phải có để dùng hooks (useCart, useState)
import React from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ShoppingCart, Minus, Plus } from 'lucide-react';

const CartPage: React.FC = () => {
  // Lấy tất cả các hàm và state cần thiết từ Cart Context
  const { items, totalAmount, totalQuantity, removeItem, updateQuantity, clearCart } = useCart();

  // Hiển thị giao diện khi giỏ hàng trống
  if (totalQuantity === 0) {
    return (
      <div className="container mx-auto p-8 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <ShoppingCart size={48} className="text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-700 mb-2">Giỏ hàng của bạn đang trống.</h1>
        <p className="text-gray-500 mb-6">Hãy thêm vật tư nông nghiệp bạn cần vào giỏ hàng!</p>
        <Link href="/" className="rounded-full bg-green-600 px-6 py-3 text-white font-medium hover:bg-green-700 transition-colors shadow-lg">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  // Giao diện khi giỏ hàng có sản phẩm
  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
        Giỏ hàng của bạn ({totalQuantity} sản phẩm)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cột 1: Danh sách Sản phẩm */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.productId} className="flex items-start bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
              
              {/* Hình ảnh sản phẩm */}
              <div className="relative w-24 h-24 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                <Image 
                  src={item.imageUrl || "https://via.placeholder.com/100"} 
                  alt={item.name} 
                  fill 
                  className="object-cover" 
                  unoptimized={true}
                />
              </div>

              {/* Thông tin sản phẩm */}
              <div className="flex-1 min-w-0 mr-4">
                <Link href={`/product/${item.slug}`} className="text-base font-semibold text-gray-800 hover:text-green-600 transition-colors block truncate">
                  {item.name}
                </Link>
                <p className="text-sm text-gray-500 mt-1">Đơn giá: {item.price.toLocaleString('vi-VN')}₫</p>
                <p className="text-lg font-bold text-red-600 mt-2">
                  Tổng: {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                </p>
              </div>

              {/* Bộ điều khiển số lượng và Xóa */}
              <div className="flex flex-col items-end space-y-2">
                <div className="flex items-center border border-gray-300 rounded-md">
                  {/* Nút Giảm số lượng */}
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    disabled={item.quantity === 1}
                    className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-3 text-sm font-medium border-x">{item.quantity}</span>
                  {/* Nút Tăng số lượng */}
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                {/* Nút Xóa Sản phẩm */}
                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-red-500 hover:text-red-700 transition-colors text-sm flex items-center mt-2"
                >
                  <Trash2 size={16} className="mr-1" /> Xóa
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cột 2: Tóm tắt Đơn hàng */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 bg-white p-6 rounded-lg shadow-xl border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Tóm tắt Đơn hàng</h2>
            
            <div className="space-y-3 text-gray-600 border-b pb-4">
              <div className="flex justify-between">
                <span>Tổng sản phẩm:</span>
                <span>{totalQuantity}</span>
              </div>
              <div className="flex justify-between">
                <span>Tạm tính:</span>
                <span>{totalAmount.toLocaleString('vi-VN')}₫</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Phí vận chuyển:</span>
                <span className='font-medium text-green-600'>Miễn phí (Tạm tính)</span>
              </div>
            </div>

            <div className="flex justify-between items-center font-extrabold text-xl mt-4">
              <span>Thành tiền:</span>
              <span className='text-red-600'>{totalAmount.toLocaleString('vi-VN')}₫</span>
            </div>

            {/* Nút Thanh toán */}
            <Link
              href="/checkout" // Chuyển hướng đến trang Thanh toán
              className="mt-6 w-full rounded-full bg-green-600 px-6 py-3 text-white font-bold text-lg shadow-green transition-colors duration-300 hover:bg-green-700 text-center block"
            >
              Tiến hành Thanh toán
            </Link>
            
            {/* Nút Xóa toàn bộ giỏ hàng */}
            <button
              onClick={clearCart}
              className="mt-3 w-full text-center text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              Xóa toàn bộ giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;