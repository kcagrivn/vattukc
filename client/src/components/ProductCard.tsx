// file: client/src/components/ProductCard.tsx

"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

// Định nghĩa kiểu dữ liệu (Schema) cho Product
interface Product {
  _id: string;
  name: string;
  price: number;
  slug: string; 
  imageUrl: string;
  category: string;
  ratings: number;
}

// Props cho ProductCard
interface ProductCardProps {
    // Nhận dữ liệu từ API hoặc dữ liệu giả lập (có thể là null/undefined)
    product: Partial<Product> | null | undefined; 
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // KHỐI CODE ĐÃ SỬA LỖI: Định nghĩa giá trị mặc định an toàn
  // Nếu product không tồn tại (là null/undefined), dùng các giá trị mặc định.
  const data = product || {}; // Nếu product là null, data = {}

  // Sử dụng giá trị mặc định an toàn
  const { 
    _id = 'demo_id', 
    name = 'Tên Sản phẩm Demo', 
    price = 650000, 
    slug = 'demo-product',
    ratings = 4.5 
  } = data;

  // Lấy URL hình ảnh, sử dụng placeholder nếu không có
  const imageUrl = data.imageUrl || "https://via.placeholder.com/300";


  return (
    <div className="w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
      
      {/* 1. Hình ảnh sản phẩm (Responsive) */}
      <Link href={`/product/${slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl} 
            alt={name}
            fill // Thuộc tính fill
            className="transition-transform duration-300 hover:scale-105 object-cover"
            unoptimized={true} 
          />
        </div>
      </Link>
      
      {/* 2. Thông tin sản phẩm */}
      <div className="p-3">
        {/* Tên sản phẩm */}
        <Link href={`/product/${slug}`}> 
          <h3 className="h-12 overflow-hidden text-sm font-semibold text-gray-800 hover:text-green-600">
            {name}
          </h3>
        </Link>
        
        {/* Đánh giá (Ratings) */}
        <div className="flex items-center text-sm text-yellow-500 my-1">
          {'★'.repeat(Math.floor(ratings))}
          {'☆'.repeat(5 - Math.floor(ratings))}
          <span className="ml-1 text-xs text-gray-500">({ratings.toFixed(1)})</span>
        </div>
        
        {/* 3. Giá và Nút Thêm Giỏ hàng */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-lg font-bold text-red-600">
            {price.toLocaleString('vi-VN')}₫
          </p>
          
          {/* Nút Thêm Giỏ hàng */}
          <button className="rounded-full bg-green-600 p-2 text-white shadow-md transition-colors duration-300 hover:bg-green-700">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;