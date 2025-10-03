// file: client/src/app/product/[slug]/page.tsx

"use client"; // Đã được sửa lỗi cú pháp

import React, { useState } from 'react'; // <-- GIỮ LẠI USESTATE ĐỂ DÙNG TRONG NÚT THÊM GIỎ HÀNG
import Image from 'next/image';
import { ShoppingCart, Star, StarHalf, Truck, CheckCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext'; // <-- GIỮ LẠI USECART

// Dữ liệu mẫu (sẽ thay thế bằng dữ liệu API sau)
const demoProduct = {
  id: '660000000000000000000001', // ID chính xác của sản phẩm
  name: 'Phân bón NPK 16-16-8 Cân bằng (50kg)',
  slug: 'phan-bon-npk-16-16-8',
  price: 650000,
  stock: 450,
  brand: 'AgriGold',
  description: 'Phân bón đa năng, cung cấp dinh dưỡng cân đối cho cây trồng trong mọi giai đoạn sinh trưởng. Thích hợp cho lúa, rau màu và cây ăn trái. Sản phẩm giúp tăng cường sức khỏe cây, cải thiện năng suất và chất lượng nông sản. Đóng gói: 50kg/bao.',
  imageUrl: 'https://via.placeholder.com/600',
  ratings: 4.7,
  numOfReviews: 125,
};

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

// KHÔNG CÓ 'async' Ở ĐÂY NỮA
const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ params }) => {
  const product = demoProduct; // Sử dụng dữ liệu mẫu
  const { addItem } = useCart();
  
  const [quantity, setQuantity] = useState(1); // State để quản lý số lượng

  // Hàm xử lý logic Thêm vào Giỏ hàng
  const handleAddToCart = () => {
    if (quantity < 1 || quantity > product.stock) {
        alert(`Vui lòng chọn số lượng từ 1 đến ${product.stock}.`);
        return;
    }

    const itemToAdd = {
      productId: product.id, 
      name: product.name,
      price: product.price,
      slug: product.slug,
      quantity: quantity,
      imageUrl: product.imageUrl,
    };

    addItem(itemToAdd);
    alert(`Đã thêm ${quantity} sản phẩm ${product.name} vào giỏ hàng!`);
  };

  // Hàm hiển thị sao đánh giá
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} fill="#facc15" className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" size={16} fill="#facc15" className="text-yellow-400" />);
    }
    const remaining = 5 - stars.length;
    for (let i = 0; i < remaining; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-300" />);
    }
    return stars;
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* SỬ DỤNG params.slug TRỰC TIẾP */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Chi tiết Sản phẩm: {params.slug}</h1> 
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white shadow-lg p-4 rounded-xl">

        {/* Cột 1: Hình ảnh và Thông tin cơ bản */}
        <div className="lg:col-span-5">
          <div className="relative h-96 w-full rounded-lg overflow-hidden mb-6">
            <Image 
              src={product.imageUrl} 
              alt={product.name} 
              fill 
              className="object-cover" 
              unoptimized={true} 
            />
          </div>
          
          {/* Đánh giá và Thương hiệu */}
          <div className="space-y-3 border-t pt-4">
            <p className="text-lg font-semibold text-gray-800">{product.name}</p>
            <div className="flex items-center space-x-2 text-sm">
                <span className="font-semibold">Thương hiệu:</span>
                <span className="text-green-600">{product.brand}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm">
                <div className="flex items-center">
                    {renderStars(product.ratings)}
                </div>
                <span className="text-gray-600">({product.numOfReviews} đánh giá)</span>
            </div>
          </div>
        </div>

        {/* Cột 2: Giá, Mua hàng, và Chi tiết */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Khu vực Giá và Trạng thái */}
          <div className="bg-green-50 p-4 rounded-lg">
            <span className="text-sm font-semibold text-gray-500 block">Giá bán:</span>
            <p className="text-4xl font-extrabold text-red-600 mt-1">
              {product.price.toLocaleString('vi-VN')}₫
            </p>
            <div className="mt-3 text-sm flex items-center space-x-2">
                <CheckCircle size={18} className="text-green-500" />
                <span className="text-gray-700">Còn hàng: {product.stock} sản phẩm</span>
            </div>
          </div>

          {/* Khu vực Số lượng và Nút mua hàng */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-3">Số lượng</h3>
            <div className="flex items-center space-x-4">
              {/* Vùng chọn số lượng: Liên kết với state quantity */}
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity} // <-- Dùng state quantity
                onChange={(e) => setQuantity(Number(e.target.value))} // <-- Cập nhật state
                className="w-20 rounded-md border border-gray-300 p-2 text-center focus:outline-none focus:ring-green-500"
              />
              
              {/* Nút Thêm vào Giỏ hàng */}
              <button 
                onClick={handleAddToCart} // <-- GỌI HÀM XỬ LÝ
                className="flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-lg font-bold text-white shadow-lg transition-colors duration-300 hover:bg-green-700"
              >
                <ShoppingCart size={20} className="mr-2" />
                Thêm vào Giỏ hàng
              </button>
            </div>
          </div>

          {/* Khu vực Vận chuyển và Chính sách */}
          <div className="border-t pt-6 space-y-4">
            <h3 className="text-lg font-semibold">Chính sách & Vận chuyển</h3>
            <div className="flex items-center space-x-3 text-gray-600">
                <Truck size={20} className="text-blue-500" />
                <span>Giao hàng toàn quốc (3-5 ngày làm việc)</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
                <CheckCircle size={20} className="text-yellow-600" />
                <span>Cam kết chính hãng, hoàn tiền 100% nếu phát hiện hàng giả</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Phần Mô tả Chi tiết Sản phẩm (Phía dưới) */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Mô tả Chi tiết</h2>
          <p className="text-gray-700 whitespace-pre-line">
              {product.description}
              <br /><br />
              Sản phẩm NPK 16-16-8 được khuyến nghị sử dụng cho nhiều loại cây trồng, bao gồm lúa, ngô, khoai, sắn, cây ăn quả (cam, quýt, bưởi, sầu riêng), và các loại rau màu (cà chua, dưa chuột, ớt). Công thức cân bằng giúp cây hấp thụ tối đa dinh dưỡng, giảm thiểu thất thoát ra môi trường.
          </p>
      </div>

      {/* Phần Đánh giá Khách hàng (Sẽ xây dựng sau) */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Đánh giá Khách hàng</h2>
          <p className="text-gray-500">Chưa có đánh giá nào cho sản phẩm này.</p>
      </div>
    </div>
  );
};

export default ProductDetailPage;