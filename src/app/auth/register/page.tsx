"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    if (password !== confirm) {
      alert("❌ Mật khẩu không khớp!");
      return;
    }

    const storedUsers = localStorage.getItem("users");
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const exists = users.find((u: any) => u.email === email);
    if (exists) {
      alert("⚠️ Email này đã được đăng ký!");
      return;
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Đăng ký thành công! Bạn có thể đăng nhập.");
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Container>
          <div className="max-w-sm mx-auto mt-10 bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold text-center mb-4">📝 Đăng ký</h1>
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
              <input
                type="password"
                placeholder="Nhập lại mật khẩu"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              />
              <button
                onClick={handleRegister}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
              >
                Đăng ký
              </button>
            </div>

            <p className="text-center text-sm mt-4">
              Đã có tài khoản?{" "}
              <a
                href="/auth/login"
                className="text-green-600 font-semibold hover:underline"
              >
                Đăng nhập
              </a>
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

