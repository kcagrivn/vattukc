// file: client/src/components/Pagination.tsx

"use client";
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

// Dữ liệu mẫu/giả định
const TOTAL_PAGES_DEMO = 25; // Giả định có 25 trang cho 500 sản phẩm (20 sp/trang)

interface PaginationProps {
    // Chúng ta sẽ dùng các props này khi kết nối với API thực tế
    productsCountAfterFilter?: number; // Tổng số sản phẩm sau khi lọc
    resultPerPage?: number; // Số lượng sản phẩm trên mỗi trang
}

const Pagination: React.FC<PaginationProps> = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // Lấy trang hiện tại từ URL, mặc định là trang 1
    const currentPage = Number(searchParams.get('page')) || 1;

    // Tính toán tổng số trang dựa trên dữ liệu giả định
    const totalPages = TOTAL_PAGES_DEMO; 
    
    // Hàm xử lý việc chuyển trang
    const changePage = (newPage: number) => {
        // Chỉ chuyển trang nếu trang mới hợp lệ
        if (newPage < 1 || newPage > totalPages) return;

        // Tạo chuỗi truy vấn mới, giữ lại các tham số tìm kiếm/lọc hiện có
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', String(newPage));
        
        // Điều hướng đến trang mới
        router.push(`/?${params.toString()}`);
    };

    return (
        <div className="flex items-center justify-center space-x-4 mt-8 mb-4">
            
            {/* Nút Previous (Trang trước) */}
            <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1} // Vô hiệu hóa ở trang đầu tiên
                className={`flex items-center rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                    currentPage === 1
                        ? 'cursor-not-allowed border-gray-200 text-gray-400'
                        : 'border-green-600 text-green-600 hover:bg-green-50'
                }`}
            >
                <ChevronLeft size={20} className="mr-1" />
                Trước
            </button>

            {/* Hiển thị số trang hiện tại và tổng số trang */}
            <span className="text-gray-700 text-sm">
                Trang <span className="font-bold">{currentPage}</span> / {totalPages}
            </span>

            {/* Nút Next (Trang tiếp theo) */}
            <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages} // Vô hiệu hóa ở trang cuối cùng
                className={`flex items-center rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                    currentPage === totalPages
                        ? 'cursor-not-allowed border-gray-200 text-gray-400'
                        : 'border-green-600 text-green-600 hover:bg-green-50'
                }`}
            >
                Tiếp <ChevronRight size={20} className="ml-1" />
            </button>
        </div>
    );
};

export default Pagination;