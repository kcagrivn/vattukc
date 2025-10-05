"use client";

import React from "react";

const Footer: React.FC = () => {
  console.log("[DEBUG: Footer] Rendered");

  return (
    <footer className="bg-green-800 text-white text-center py-4 mt-10">
      <p className="text-sm">
        © {new Date().getFullYear()} VATTUKC — Cung cấp vật tư nông nghiệp.
      </p>
    </footer>
  );
};

export default Footer;

