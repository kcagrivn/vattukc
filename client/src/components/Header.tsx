// file: client/src/components/Header.tsx

"use client"; // Bắt buộc phải có để dùng Hooks

import React, { useState, useEffect } from 'react'; // <-- ĐÃ THÊM useEffect
import Link from 'next/link';
import { Search, ShoppingCart, Menu } from 'lucide-react'; 
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext'; 

const Header: React.FC = () => {
  const [keyword, setKeyword] = useState(''); 
  const router = useRouter();
  const { totalQuantity } = useCart(); 
  const [isMounted, setIsMounted] = useState(false); // <-- State mới để kiểm tra Client side

  // Khắc phục lỗi Hydration: Đánh dấu component đã được mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Hàm xử lý khi nhấn nút tìm kiếm
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      router.push(`/?keyword=${keyword}`); 
    } else {
      router.push('/');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Container chính cho Header */}
      <div className="container mx-auto flex items-center justify-between p-3">
        
        {/* 1. Nút Menu (Dành cho Mobile) */}
        <button className="text-gray-600 lg:hidden">
          <Menu size={24} />
        </button>

        {/* 2. Logo/Tên Ứng dụng */}
        <Link href="/" className="text-2xl font-bold text-green-700">
          VattuKC
        </Link>
        
        {/* 3. Thanh Tìm kiếm (Chính giữa - Sử dụng form để xử lý submit) */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4 hidden lg:flex">
          <input
            type="text"
            placeholder="Tìm kiếm vật tư nông nghiệp..."
            value={keyword} 
            onChange={(e) => setKeyword(e.target.value)} 
            className="w-full rounded-l-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button type="submit" className="rounded-r-lg bg-green-600 px-4 text-white hover:bg-green-700">
            <Search size={20} />
          </button>
        </form>

        {/* 4. Biểu tượng Giỏ hàng và Tài khoản */}
        <div className="flex items-center space-x-4">
          
          {/* Nút tìm kiếm (Dành cho Mobile) */}
          <button onClick={handleSearch} className="text-gray-600 lg:hidden">
            <Search size={24} />
          </button>

          {/* Biểu tượng Giỏ hàng */}
          <Link href="/cart" className="relative text-gray-600 hover:text-green-600">
            <ShoppingCart size={24} />
            {/* Khắc phục lỗi Hydration: Chỉ hiển thị số lượng sau khi component đã mount và totalQuantity > 0 */}
            {isMounted && totalQuantity > 0 && ( 
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {totalQuantity} {/* <-- HIỂN THỊ TỔNG SỐ LƯỢNG */}
                </span>
            )}
          </Link>

          {/* Nút Đăng nhập/Đăng ký (Desktop) */}
          <Link href="/login" className="hidden rounded-md border border-green-600 px-3 py-1 text-sm text-green-600 hover:bg-green-50 lg:block">
            Đăng nhập
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;