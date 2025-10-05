// file: client/src/app/admin/products/page.tsx

import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import ProductRow from '@/components/admin/ProductRow'; // Import component dòng sản phẩm

// Định nghĩa kiểu dữ liệu cho sản phẩm Admin (phải khớp với Backend)
interface AdminProduct {
    _id: string;
    name: string;
    stock: number;
    price: number;
    category: string;
    brand: string;
}

// DỮ LIỆU GIẢ LẬP AN TOÀN (FALLBACK DATA)
const FALLBACK_PRODUCTS = [
    { _id: '1', name: 'Phân bón NPK 30-10-10 (Giả lập)', stock: 120, price: 850000, category: 'Phân bón', brand: 'GrowFast' },
    { _id: '2', name: 'Thuốc Trừ Sâu Sên', stock: 5, price: 120000, category: 'Thuốc BVTV', brand: 'BioProtect' },
    { _id: '3', name: 'Bình Xịt 5L', stock: 0, price: 350000, category: 'Dụng cụ', brand: 'AgriTools' },
];


// Hàm Fetch dữ liệu sản phẩm từ Backend Admin API
async function getAdminProducts(): Promise<AdminProduct[]> {
    try {
        // Gọi API Admin Products mới
        const res = await fetch('http://localhost:5000/api/v1/admin/products', {
            cache: 'no-store', 
        });

        if (!res.ok) {
             // Ném lỗi để chuyển sang khối catch nếu trạng thái không phải 200
             throw new Error(`Failed to fetch admin products: ${res.statusText}`);
        }

        const data = await res.json();
        // TRẢ VỀ MẢNG SẢN PHẨM HOẶC MẢNG RỖNG NẾU DỮ LIỆU THIẾU
        return data.products || []; 
    } catch (error) {
        console.error("LỖI KẾT NỐI API ADMIN:", error);
        // TRẢ VỀ DỮ LIỆU GIẢ LẬP AN TOÀN KHI GẶP LỖI MẠNG/FETCH FAILED
        return FALLBACK_PRODUCTS; 
    }
}

export default async function AdminProductsPage() {
    // Lấy danh sách sản phẩm (thực tế hoặc giả lập)
    const products = await getAdminProducts();
    
    // KHẮC PHỤC LỖI: Đảm bảo products là một mảng [] nếu fetch thất bại hoàn toàn
    const safeProducts = Array.isArray(products) ? products : FALLBACK_PRODUCTS;
    const totalCount = safeProducts.length;

    return (
        <div>
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-800">Quản lý Sản phẩm ({totalCount})</h1>
                <Link href="/admin/products/new" className='bg-green-600 text-white px-4 py-2 rounded-lg text-sm flex items-center hover:bg-green-700 transition-colors'>
                    <Plus size={20} className='mr-1' /> Thêm Mới
                </Link>
            </div>

            {/* Bảng Hiển thị Danh sách Sản phẩm */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tên Sản phẩm</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Giá</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tồn kho</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Danh mục</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Thương hiệu</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {safeProducts.map((product) => (
                            <ProductRow key={product._id} product={product} />
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* Hiển thị thông báo khi không tìm thấy sản phẩm */}
            {totalCount === 0 && (
                <div className='p-6 text-center text-gray-500'>
                    Không tìm thấy sản phẩm nào.
                </div>
            )}
        </div>
    );
}