// file: client/src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import FilterBar from '@/components/FilterBar'; 
import Footer from '@/components/Footer'; 
import { CartProvider } from '@/context/CartContext'; 
import { Suspense } from 'react'; // <-- IMPORT Suspense để xử lý lỗi useSearchParams

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VattuKC | Ứng dụng Bán hàng Vật tư Nông nghiệp',
  description: 'Trang web thương mại điện tử chuyên cung cấp vật tư, phân bón, và thuốc bảo vệ thực vật chất lượng cao.',
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
            
            {/* Bọc FilterBar bằng Suspense để khắc phục lỗi useSearchParams (Lỗi Vercel/Next.js) */}
            {/* Fallback={null} đảm bảo không bị lỗi giao diện khi chờ load */}
            <Suspense fallback={null}> 
              <FilterBar />
            </Suspense>
            
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