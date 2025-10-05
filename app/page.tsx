export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        🌿 VATTUKC.COM
      </h1>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Đây là trang chủ thử nghiệm. Nếu bạn thấy dòng này, frontend đã chạy thành công!
      </p>
      <a
        href="/login"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        👉 Đi đến trang đăng nhập
      </a>
    </main>
  );
}

