"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const storedUsers = localStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const found = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (found) {
      localStorage.setItem("loggedInUser", JSON.stringify(found));
      alert("✅ Đăng nhập thành công!");
      router.push("/");
    } else {
      alert("❌ Sai email hoặc mật khẩu!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Container>
          <div className="max-w-sm mx-auto mt-10 bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold text-center mb-4">🔐 Đăng nhập</h1>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
              <button
                onClick={handleLogin}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
              >
                Đăng nhập
              </button>
            </div>

            <p className="text-center text-sm mt-4">
              Chưa có tài khoản?{" "}
              <a
                href="/auth/register"
                className="text-green-600 font-semibold hover:underline"
              >
                Đăng ký ngay
              </a>
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

