// file: client/src/components/admin/ProductRow.tsx

"use client";
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

// Định nghĩa kiểu dữ liệu cho sản phẩm Admin (phải khớp với Backend)
interface AdminProduct {
    _id: string;
    name: string;
    stock: number;
    price: number;
    category: string;
    brand: string;
}

interface ProductRowProps {
    product: AdminProduct;
}

const ProductRow: React.FC<ProductRowProps> = ({ product }) => {
    // Hàm xử lý xóa sản phẩm (chức năng giả lập)
    const handleDelete = () => {
        if (confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${product.name}"?`)) {
            alert('Chức năng xóa sẽ được kết nối với API Backend sau!');
        }
    };

    return (
        <tr className="border-b hover:bg-gray-50 transition-colors">
            {/* Tên sản phẩm */}
            <td className="px-4 py-3 font-medium text-gray-900">
                {product.name}
            </td>
            
            {/* Giá */}
            <td className="px-4 py-3 text-sm text-red-600 font-semibold">
                {product.price.toLocaleString('vi-VN')}₫
            </td>
            
            {/* Tồn kho */}
            <td className="px-4 py-3 text-sm">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.stock > 50 
                        ? 'bg-green-100 text-green-800' 
                        : product.stock > 0 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                }`}>
                    {product.stock}
                </span>
            </td>
            
            {/* Danh mục */}
            <td className="px-4 py-3 text-sm text-gray-500">
                {product.category}
            </td>
            
            {/* Thương hiệu */}
            <td className="px-4 py-3 text-sm text-gray-500">
                {product.brand}
            </td>
            
            {/* Hành động */}
            <td className="px-4 py-3 text-center">
                <div className="flex items-center space-x-3 justify-center">
                    {/* Nút Sửa */}
                    <Link href={`/admin/products/edit/${product._id}`} 
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title='Sửa sản phẩm'>
                        <Edit size={18} />
                    </Link>
                    
                    {/* Nút Xóa */}
                    <button onClick={handleDelete} 
                            className="text-red-600 hover:text-red-800 transition-colors"
                            title='Xóa sản phẩm'>
                        <Trash2 size={18} />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default ProductRow;