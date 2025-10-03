// file: client/next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  // Cấu hình để cho phép tải hình ảnh từ các tên miền ngoài
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', 
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // CẤU HÌNH PROXY MỚI: Chuyển hướng các yêu cầu /api/v1/... sang cổng 5000
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*', // Mọi yêu cầu bắt đầu bằng /api/v1
        destination: 'http://localhost:5000/api/v1/:path*', // Chuyển sang Backend
      },
    ];
  },
};

module.exports = nextConfig;