// file: client/src/app/admin/page.tsx

import React from 'react';
import Link from 'next/link';

export default function AdminOverviewPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Bảng Điều khiển Tổng quan</h1>
      <p className='text-gray-600 mb-8'>
        Chào mừng trở lại, Admin! Bắt đầu quản lý đơn hàng và sản phẩm của VattuKC tại đây.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card Thống kê mẫu */}
        <div className="bg-blue-50 p-5 rounded-lg shadow border-l-4 border-blue-600">
          <p className="text-sm text-gray-500">Tổng Doanh thu (Giả định)</p>
          <p className="text-3xl font-extrabold text-blue-800 mt-1">125.000.000₫</p>
        </div>
        
        <div className="bg-yellow-50 p-5 rounded-lg shadow border-l-4 border-yellow-600">
          <p className="text-sm text-gray-500">Đơn hàng mới</p>
          <p className="text-3xl font-extrabold text-yellow-800 mt-1">15</p>
        </div>

        <div className="bg-green-50 p-5 rounded-lg shadow border-l-4 border-green-600">
          <p className="text-sm text-gray-500">Tổng Sản phẩm</p>
          <p className="text-3xl font-extrabold text-green-800 mt-1">500+</p>
        </div>
      </div>
      
      <div className='mt-10'>
          <h2 className='text-2xl font-semibold mb-4'>Hành động nhanh</h2>
          <Link href="/admin/products/new" className='bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition-colors'>
             + Thêm Sản phẩm Mới
          </Link>
      </div>
    </div>
  );
}