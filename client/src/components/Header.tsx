"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Header: React.FC = () => {
  const { cart } = useCart();

  console.log("[DEBUG: Header] Cart items:", cart);

  return (
    <header className="bg-green-700 text-white p-4 flex justify-between items-center">
      <Link href="/" className="font-bold text-lg">
        VATTUKC 🌿
      </Link>
      <nav className="space-x-4">
        <Link href="/products" className="hover:underline">
          Sản phẩm
        </Link>
        <Link href="/cart" className="hover:underline flex items-center gap-1">
          <ShoppingCart size={18} />
          <span>({cart.length})</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;

