// file: client/src/components/Footer.tsx

import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12 pt-8 pb-4">
      <div className="container mx-auto px-4">
        
        {/* Phần trên: Liên kết và Liên hệ */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-6">
          
          {/* Cột 1: Giới thiệu */}
          <div>
            <h4 className="text-xl font-bold text-green-400 mb-4">VattuKC</h4>
            <p className="text-sm text-gray-400">
              Chuyên cung cấp vật tư nông nghiệp, phân bón, và thuốc bảo vệ thực vật chất lượng cao.
            </p>
          </div>
          
          {/* Cột 2: Hỗ trợ Khách hàng */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-green-400 transition-colors">Về chúng tôi</Link></li>
              <li><Link href="/contact" className="hover:text-green-400 transition-colors">Liên hệ</Link></li>
              <li><Link href="/faq" className="hover:text-green-400 transition-colors">Câu hỏi thường gặp</Link></li>
            </ul>
          </div>

          {/* Cột 3: Chính sách */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Chính sách</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/policy/shipping" className="hover:text-green-400 transition-colors">Chính sách vận chuyển</Link></li>
              <li><Link href="/policy/warranty" className="hover:text-green-400 transition-colors">Chính sách bảo hành</Link></li>
              <li><Link href="/policy/privacy" className="hover:text-green-400 transition-colors">Chính sách bảo mật</Link></li>
            </ul>
          </div>

          {/* Cột 4: Thông tin Liên hệ */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center space-x-2">
                <MapPin size={18} className="text-green-400" />
                <span>Số 123, Đường Nông Sản, Buôn Ma Thuột</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} className="text-green-400" />
                <span>09xx-xxx-xxx</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="text-green-400" />
                <span>support@vattukc.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Phần dưới: Bản quyền */}
        <div className="pt-4 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} VattuKC. Tất cả các quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
};

export default Footer;