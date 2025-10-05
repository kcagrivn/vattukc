// file: client/next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // THUỘC TÍNH FIX LỖI 404 VERCEL: Đảm bảo mọi tuyến đường đều có dấu gạch chéo cuối
  trailingSlash: true, 
  
  // Cấu hình để cho phép tải hình ảnh từ các tên miền ngoài
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', // Cho phép hình ảnh placeholder
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // CẤU HÌNH PROXY: Chuyển hướng các yêu cầu /api/v1/... sang Backend cục bộ (cổng 5000)
  async rewrites() {
    return [
      {
        // Yêu cầu này chỉ dùng cho môi trường phát triển (localhost)
        source: '/api/v1/:path*', 
        destination: 'http://localhost:5000/api/v1/:path*',
      },
    ];
  },
};

module.exports = nextConfig;