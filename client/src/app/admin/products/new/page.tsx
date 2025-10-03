// file: client/src/app/admin/products/new/page.tsx

"use client";
import React, { useState } from 'react';
import { PlusCircle, Save } from 'lucide-react';

// Định nghĩa trạng thái ban đầu của form sản phẩm
const initialFormState = {
    name: '',
    slug: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    brand: '',
    images: [{ public_id: 'temp_id', url: 'https://via.placeholder.com/100' }], // Giả lập hình ảnh
};

export default function AdminNewProductPage() {
    const [formData, setFormData] = useState(initialFormState);
    const [isLoading, setIsLoading] = useState(false);

    // Hàm xử lý thay đổi form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Hàm xử lý tạo slug tự động
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        const slug = name
            .toLowerCase()
            .replace(/ /g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
            .replace(/[^\w-]+/g, '') // Loại bỏ các ký tự không hợp lệ
            .substring(0, 50); // Giới hạn độ dài slug
        
        setFormData({
            ...formData,
            name: name,
            slug: slug,
        });
    };

    // Hàm xử lý gửi form
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        // --- LOGIC GỌI API BACKEND ---
        try {
            const res = await fetch('http://localhost:5000/api/v1/product/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.status === 201) {
                alert('Tạo sản phẩm thành công! (Dữ liệu tạm thời)');
                setFormData(initialFormState); // Reset form
            } else {
                const errorData = await res.json();
                alert(`Lỗi: ${errorData.message}`);
            }

        } catch (error) {
            alert('Lỗi kết nối Server Backend. Vui lòng kiểm tra Server 5000.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <PlusCircle size={24} className="mr-3 text-green-600" />
                Thêm Sản phẩm Mới
            </h1>
            
            {/* 1. THÔNG TIN CƠ BẢN */}
            <div className="bg-gray-50 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Thông tin cơ bản</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Tên sản phẩm */}
                    <div className='col-span-1'>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tên Sản phẩm <span className='text-red-500'>*</span></label>
                        <input type="text" name="name" required value={formData.name} onChange={handleNameChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" />
                    </div>

                    {/* Slug (URL) */}
                    <div className='col-span-1'>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                        <input type="text" name="slug" readOnly value={formData.slug} className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" />
                        <p className='text-xs text-gray-500 mt-1'>Tạo tự động từ tên sản phẩm.</p>
                    </div>

                    {/* Mô tả */}
                    <div className='col-span-full'>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả chi tiết <span className='text-red-500'>*</span></label>
                        <textarea name="description" rows={4} required value={formData.description} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" />
                    </div>
                </div>
            </div>

            {/* 2. GIÁ VÀ TỒN KHO */}
            <div className="bg-gray-50 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Giá và Tồn kho</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Giá bán */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Giá bán (VNĐ) <span className='text-red-500'>*</span></label>
                        <input type="number" name="price" required min="0" value={formData.price} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" />
                    </div>

                    {/* Tồn kho */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng Tồn kho <span className='text-red-500'>*</span></label>
                        <input type="number" name="stock" required min="0" value={formData.stock} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" />
                    </div>
                </div>
            </div>

            {/* 3. PHÂN LOẠI */}
            <div className="bg-gray-50 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Phân loại</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Danh mục */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục <span className='text-red-500'>*</span></label>
                        <select name="category" required value={formData.category} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-gray-700">
                            <option value="" disabled>-- Chọn danh mục --</option>
                            <option value="PhanBon">Phân bón</option>
                            <option value="ThuocBVTV">Thuốc Bảo vệ Thực vật</option>
                            <option value="DungCu">Dụng cụ Nông nghiệp</option>
                        </select>
                    </div>

                    {/* Thương hiệu */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Thương hiệu</label>
                        <input type="text" name="brand" value={formData.brand} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" />
                    </div>
                </div>
            </div>

            {/* Nút Gửi (Submit) */}
            <div className='flex justify-end'>
                <button 
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center space-x-2 rounded-lg bg-green-600 px-6 py-3 text-white font-bold text-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
                >
                    <Save size={20} />
                    <span>{isLoading ? 'Đang tạo...' : 'Lưu Sản phẩm'}</span>
                </button>
            </div>
        </form>
    );
}