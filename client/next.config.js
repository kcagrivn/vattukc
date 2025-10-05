/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Bỏ qua lỗi ESLint khi build trên CI/CD (không cần cài eslint)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ⚡ Chỉ định thư mục gốc chuẩn cho tracing khi có nhiều lockfile
  outputFileTracingRoot: __dirname,

  // (Tuỳ chọn) Nếu bạn dùng basePath hoặc i18n thì có thể thêm ở đây
};

module.exports = nextConfig;

