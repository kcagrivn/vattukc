// file: client/src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import FilterBar from '@/components/FilterBar'; 
import Footer from '@/components/Footer'; 
import { CartProvider } from '@/context/CartContext'; 
import { Suspense } from 'react'; // <-- IMPORT Suspense

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VattuKC | Ứng dụng Bán hàng Vật tư Nông nghiệp',
  description: 'Trang web thương mại điện tử chuyên cung cấp vật tư, phân bón, và thuốc bảo vệ thực vật chất lượng cao.',
};

// Component Wrapper để bao bọc FilterBar trong Suspense
// Hàm này giúp Next.js biết rằng nó nên chờ đợi các hooks.
const FilterBarWrapper = () => {
    // Thêm một div để đảm bảo DOM match
    return (
        <Suspense fallback={null}> 
            <FilterBar />
        </Suspense>
    );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <CartProvider>
            <Header /> 
            
            {/* THAY THẾ FILTERBAR TRỰC TIẾP BẰNG COMPONENT WRAPPER */}
            <FilterBarWrapper />
            
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