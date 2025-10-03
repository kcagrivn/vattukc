// file: client/src/app/register/page.tsx

"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Lock, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';

// THÊM CẤU HÌNH NÀY VÀO ĐÂY
export const dynamic = 'force-dynamic';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Hàm xử lý thay đổi form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Hàm xử lý gửi form (Kết nối với API Backend)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // GỌI API ĐĂNG KÝ
            const res = await fetch('/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            
            if (res.status === 201) {
                // Đăng ký thành công (Server trả về token và cookie)
                alert('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.');
                router.push('/login'); // Chuyển hướng đến trang Đăng nhập
            } else {
                // Xử lý lỗi từ server (ví dụ: email đã tồn tại)
                setError(data.message || 'Đăng ký thất bại. Vui lòng thử lại.');
            }

        } catch (err) {
            setError('Lỗi kết nối Server Backend. Vui lòng kiểm tra Server 5000.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-2xl border-t-4 border-green-600">
                <h1 className="text-3xl font-bold text-center text-gray-900">
                    Đăng ký Tài khoản VattuKC
                </h1>
                
                {/* Hiển thị lỗi */}
                {error && (
                    <div className="p-3 text-red-700 bg-red-100 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    
                    {/* Tên */}
                    <div className="relative">
                        <User size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Họ và Tên"
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="Địa chỉ Email"
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    {/* Mật khẩu */}
                    <div className="relative">
                        <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Mật khẩu (ít nhất 8 ký tự)"
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    {/* Nút Đăng ký */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400"
                    >
                        {isLoading ? 'Đang xử lý...' : <><LogIn size={20} /> <span>Đăng ký</span></>}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600">
                    Đã có tài khoản?{' '}
                    <Link href="/login" className="font-semibold text-green-600 hover:text-green-700">
                        Đăng nhập ngay
                    </Link>
                </p>
            </div>
        </div>
    );
}