// file: client/src/components/FilterDropdown.tsx

"use client";
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface FilterDropdownProps {
  title: string; // Tên bộ lọc (ví dụ: Danh mục)
  filterKey: string; // Key trong URL (ví dụ: category)
  options: { label: string; value: string }[]; // Danh sách các tùy chọn
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ title, filterKey, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Lấy giá trị lọc hiện tại từ URL
  const currentFilterValue = searchParams.get(filterKey);

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

  // Hàm xử lý khi người dùng chọn một tùy chọn
  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (currentFilterValue === value) {
        // Nếu đã chọn, loại bỏ bộ lọc
        params.delete(filterKey);
    } else {
        // Áp dụng bộ lọc mới
        params.set(filterKey, value);
    }
    
    params.delete('page'); // Reset trang khi lọc
    router.push(`/?${params.toString()}`);
    setIsOpen(false);
  };

  // Giá trị hiển thị trên nút
  const displayTitle = options.find(opt => opt.value === currentFilterValue)?.label || title;
  const isActive = !!currentFilterValue;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-1 rounded-md px-3 py-1 text-sm font-medium transition-colors ${
            isActive ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
      >
        <span>{displayTitle}</span>
        <ChevronDown size={16} className={`${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 z-10 mt-2 w-48 rounded-lg bg-white shadow-xl border border-gray-200">
          <div className="p-2 space-y-1">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className="flex items-center justify-between cursor-pointer rounded-md p-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
              >
                <span>{option.label}</span>
                {currentFilterValue === option.value && (
                  <Check size={16} className="text-green-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;