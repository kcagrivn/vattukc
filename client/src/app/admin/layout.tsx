// file: client/src/app/admin/layout.tsx

import Link from 'next/link';
import { Truck, Package, Users, BarChart3, LogOut } from 'lucide-react';

export const metadata = {
  title: 'VattuKC | Admin Dashboard',
  description: 'Bảng điều khiển quản trị sản phẩm và đơn hàng.',
};

// Mảng chứa các liên kết điều hướng
const adminNavItems = [
    { name: 'Tổng quan', href: '/admin', icon: BarChart3 },
    { name: 'Sản phẩm', href: '/admin/products', icon: Package },
    { name: 'Đơn hàng', href: '/admin/orders', icon: Truck },
    { name: 'Người dùng', href: '/admin/users', icon: Users },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      {/* Sidebar (Thanh bên) */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col fixed h-full shadow-2xl">
        <div className="p-6 text-2xl font-bold text-green-400 border-b border-gray-700">
          VattuKC Admin
        </div>
        
        {/* Menu Điều hướng */}
        <nav className="flex-1 p-4 space-y-2">
          {adminNavItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-green-700 hover:text-white transition-colors"
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        
        {/* Nút Đăng xuất */}
        <div className="p-4 border-t border-gray-700">
          <button className="flex items-center space-x-3 p-3 w-full rounded-lg text-red-400 hover:bg-gray-700 transition-colors">
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content (Nội dung chính) */}
      <main className="flex-1 ml-64 p-8">
        <div className="bg-white p-6 rounded-xl shadow-lg min-h-[85vh]">
          {children}
        </div>
      </main>
    </div>
  );
}