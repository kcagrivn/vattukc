// file: client/src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import FilterBar from '@/components/FilterBar';
import Footer from '@/components/Footer'; 
import { CartProvider } from '@/context/CartContext'; // <-- IMPORT PROVIDER

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  // ... (metadata giữ nguyên)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        {/* Bọc toàn bộ ứng dụng bằng CartProvider */}
        <CartProvider>
            <Header /> 
            <FilterBar /> 
            
            {/* Nội dung chính của trang web */}
            <main className='min-h-screen'>
                {children}
            </main>
            
            <Footer />
        </CartProvider>
      </body>
    </html>
  );
}