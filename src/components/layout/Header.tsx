"use client";

import Link from "next/link";
import { useState } from "react";
import Container from "./Container";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-green-600 text-white sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="font-bold text-lg">
            🌿 VATTUKC
          </Link>

          {/* Menu desktop */}
          <nav className="hidden md:flex space-x-6 text-sm font-semibold">
            <Link href="/">Trang chủ</Link>
            <Link href="/products">Sản phẩm</Link>
            <Link href="/auth/login">Đăng nhập</Link>
            <Link href="/admin">Admin</Link>
          </nav>

          {/* Nút mobile */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            {open ? "✖" : "☰"}
          </button>
        </div>

        {/* Menu mobile */}
        {open && (
          <nav className="md:hidden flex flex-col space-y-2 pb-4 text-sm font-semibold">
            <Link href="/" onClick={() => setOpen(false)}>
              Trang chủ
            </Link>
            <Link href="/products" onClick={() => setOpen(false)}>
              Sản phẩm
            </Link>
            <Link href="/auth/login" onClick={() => setOpen(false)}>
              Đăng nhập
            </Link>
            <Link href="/admin" onClick={() => setOpen(false)}>
              Admin
            </Link>
          </nav>
        )}
      </Container>
    </header>
  );
}

