// file: client/src/app/page.tsx

import ProductCard from '@/components/ProductCard';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Pagination from '@/components/Pagination';

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface ProductData {
    _id: string;
    name: string;
    price: number;
    slug: string; 
    imageUrl: string;
    category: string;
    ratings: number;
}

// Khai báo URL Backend (sử dụng biến môi trường công khai)
// Next.js sẽ thay thế biến này bằng URL Render của bạn
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

// Hàm Fetch dữ liệu từ Backend (Đã sửa lỗi Runtime khi lặp qua searchParams)
async function getProducts(searchParams: { [key: string]: string | string[] | undefined }) {
    
    // Sử dụng vòng lặp an toàn và URLSearchParams để tạo chuỗi truy vấn
    const urlSearchParams = new URLSearchParams();
    
    // Lặp qua các key an toàn và thêm chúng vào URLSearchParams
    for (const key in searchParams) {
        const value = searchParams[key]; 
        
        if (typeof value === 'string' && value) {
            urlSearchParams.set(key, value);
        }
    }

    const urlQuery = urlSearchParams.toString(); // Chuyển đổi an toàn

    try {
        // Gửi tham số tìm kiếm qua URL bằng biến môi trường công khai
        const res = await fetch(`${BACKEND_URL}/api/v1/products?${urlQuery}`, { 
            cache: 'no-store', 
        });

        if (!res.ok) {
            console.error(`API products failed: ${res.statusText}`);
            return []; 
        }

        const data = await res.json();
        return data.products || []; // Trả về mảng rỗng nếu dữ liệu thiếu
    } catch (error) {
        console.error("LỖI KẾT NỐI API BACKEND:", error);
        return []; // Trả về mảng rỗng nếu có lỗi
    }
}

// Hàm Home bây giờ nhận searchParams từ Next.js
export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
    // Gọi hàm fetch với tham số tìm kiếm
    const products: ProductData[] = await getProducts(searchParams);
    
    // Dữ liệu giả lập an toàn
    const demoProductData = { 
        name: "Phân bón NPK 16-16-8 Cân bằng", 
        price: 650000, 
        slug: "phan-bon-npk-16-16-8", 
        ratings: 4.5,
        imageUrl: "https://via.placeholder.com/300" 
    };
    
    // Tạo 8 sản phẩm giả lập an toàn nếu API trả về mảng rỗng
    const displayProducts = products.length > 0 
        ? products 
        : Array(8).fill(demoProductData).map((p, i) => ({ ...p, _id: i.toString() })); 

    return (
        <div className="container mx-auto p-4 pt-6">
            
            {/* Phần Banner/Slider */}
            <div className="mb-8 h-40 w-full rounded-lg bg-green-100 p-4 text-center flex items-center justify-center">
                <h1 className="text-xl font-semibold text-green-800">
                    Banner Quảng Cáo Vật Tư Nông Nghiệp
                </h1>
            </div>

            {/* Tiêu đề phần Sản phẩm nổi bật */}
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                    Sản phẩm ({products.length > 0 ? products.length : 'Demo'})
                </h2>
                <Link href="/products" className="flex items-center text-sm text-green-600 hover:text-green-800">
                    Xem tất cả <ArrowRight size={16} className="ml-1" />
                </Link>
            </div>

            {/* Lưới hiển thị Sản phẩm */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {displayProducts.map((product, index) => (
                    // Truyền dữ liệu sản phẩm an toàn vào ProductCard
                    <ProductCard key={product._id || index} product={product} /> 
                ))}
            </div>

            {/* TRIỂN KHAI COMPONENT PHÂN TRANG */}
            <Pagination /> 
            
            <div className='h-20'></div> 
        </div>
    );
}