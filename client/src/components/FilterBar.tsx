// file: client/src/components/FilterBar.tsx

"use client"; 
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterDropdown from './FilterDropdown'; // <-- ĐÃ IMPORT

// Dữ liệu mẫu (Giả định các tùy chọn có sẵn)
const categoryOptions = [
    { label: 'Phân bón', value: 'phan-bon' },
    { label: 'Thuốc trừ sâu', value: 'thuoc-tru-sau' },
    { label: 'Dụng cụ', value: 'dung-cu' },
];

const brandOptions = [
    { label: 'AgriGold', value: 'agrigold' },
    { label: 'BioProtect', value: 'bioprotect' },
    { label: 'GrowFast', value: 'growfast' },
];

const FilterBar: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams(); 
    
    // Logic Sắp xếp (Sort)
    const initialSort = searchParams.get('sort') || 'popular';
    const [sortValue, setSortValue] = useState(initialSort);

    // Hàm xử lý Lọc Giá (Tạm thời)
    const handlePriceFilter = () => {
        const params = new URLSearchParams(searchParams.toString());
        // Giả lập lọc giá: Giá lớn hơn hoặc bằng 500,000 VND
        params.set('price[gte]', '500000'); 
        params.delete('page');
        router.push(`/?${params.toString()}`);
    };

    // Hàm xử lý khi người dùng thay đổi Sắp xếp (Sort)
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSort = e.target.value;
        setSortValue(newSort);
        const params = new URLSearchParams(searchParams.toString());
        params.set('sort', newSort);
        
        // Cần đảm bảo tham số sort được định dạng đúng cho Backend
        if (newSort === 'price-asc') {
             params.set('sort', 'price'); 
        } else if (newSort === 'price-desc') {
             params.set('sort', '-price'); // Dấu trừ cho sắp xếp giảm dần
        } else if (newSort === 'rating') {
             params.set('sort', '-ratings'); 
        } else {
             params.delete('sort'); // Xóa sort nếu chọn phổ biến
        }

        router.push(`/?${params.toString()}`);
    };

    return (
        // Thanh lọc chỉ hiển thị trên màn hình lớn (lg:flex)
        <div className="hidden lg:flex w-full bg-gray-50 border-y border-gray-200 py-3 shadow-sm">
          <div className="container mx-auto flex items-center justify-between text-sm text-gray-600">
            
            {/* 1. Khu vực Lọc (Filter) */}
            <div className="flex items-center space-x-4">
              <span className="font-semibold text-gray-800">Lọc theo:</span>

              {/* Bộ lọc Danh mục */}
              <FilterDropdown 
                title="Danh mục" 
                filterKey="category" 
                options={categoryOptions} 
              />

              {/* Bộ lọc Thương hiệu */}
              <FilterDropdown 
                title="Thương hiệu" 
                filterKey="brand" 
                options={brandOptions} 
              />

              {/* Bộ lọc Giá (Giữ nguyên dạng nút, có thể thay đổi sau) */}
              <div 
                onClick={handlePriceFilter} 
                className="flex items-center space-x-2 cursor-pointer hover:text-green-600 transition-colors"
              >
                <span className="font-medium">Mức giá</span>
                <ChevronDown size={16} />
              </div>
            </div>

            {/* 2. Khu vực Sắp xếp (Sort) */}
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-800">Sắp xếp theo:</span>
              
              <select 
                value={sortValue} 
                onChange={handleSortChange} // Xử lý thay đổi
                className="rounded-md border border-gray-300 py-1 px-3 focus:border-green-500 focus:ring-green-500"
              >
                <option value="popular">Phổ biến nhất</option>
                <option value="newest">Hàng mới về</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
                <option value="rating">Đánh giá tốt nhất</option>
              </select>
            </div>
          </div>
        </div>
    );
};

export default FilterBar;