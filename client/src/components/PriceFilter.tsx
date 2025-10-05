// file: client/src/components/PriceFilter.tsx

"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// ĐÃ THÊM ChevronDown VÀO IMPORT
import { Search, ChevronDown } from 'lucide-react'; 

interface PriceFilterProps {
  title: string;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Lấy giá trị min/max hiện tại từ URL (price[gte] và price[lte])
  const initialMin = searchParams.get('price[gte]') || '';
  const initialMax = searchParams.get('price[lte]') || '';
  
  const [minPrice, setMinPrice] = useState(initialMin);
  const [maxPrice, setMaxPrice] = useState(initialMax);

  // Xử lý đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Hàm xử lý áp dụng bộ lọc giá
  const handleApplyFilter = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    
    // Xóa tham số cũ
    params.delete('price[gte]');
    params.delete('price[lte]');

    // Áp dụng tham số mới
    if (minPrice) {
      params.set('price[gte]', minPrice);
    }
    if (maxPrice) {
      params.set('price[lte]', maxPrice);
    }
    
    params.delete('page'); // Reset trang
    router.push(`/?${params.toString()}`);
    setIsOpen(false);
  };
  
  // Hàm xóa bộ lọc giá
  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('price[gte]');
    params.delete('price[lte]');
    params.delete('page');
    
    setMinPrice(''); 
    setMaxPrice(''); 
    setIsOpen(false);
    router.push(`/?${params.toString()}`);
  };

  // Kiểm tra xem bộ lọc giá có đang được áp dụng không
  const isActive = !!(initialMin || initialMax);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-1 rounded-md px-3 py-1 text-sm font-medium transition-colors ${
            isActive ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        <span>{title}</span>
        {/* ĐÃ SỬA LỖI: ChevronDown đã được import */}
        <ChevronDown size={16} className={`${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform`} /> 
      </button>

      {/* Dropdown Menu Giá */}
      {isOpen && (
        <div className="absolute top-full left-0 z-20 mt-2 w-64 rounded-lg bg-white shadow-xl border border-gray-200 p-4">
            <form onSubmit={handleApplyFilter} className='space-y-3'>
                <h4 className='font-semibold text-gray-800'>Khoảng giá (VNĐ)</h4>
                
                <div className='flex items-center space-x-2'>
                    <input
                        type="number"
                        placeholder="Giá từ"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-1/2 rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                    <span className='text-gray-500'>đến</span>
                    <input
                        type="number"
                        placeholder="Giá đến"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-1/2 rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                </div>
                
                <div className='flex justify-between items-center pt-2'>
                    {isActive && (
                        <button
                            type="button"
                            onClick={handleClearFilter}
                            className="text-red-600 text-sm hover:underline"
                        >
                            Xóa
                        </button>
                    )}
                    <button
                        type="submit"
                        className="flex items-center justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
                    >
                        <Search size={16} className='mr-1' /> Áp dụng
                    </button>
                </div>
            </form>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;