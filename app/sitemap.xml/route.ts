export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

export async function GET() {
  // 🧭 Trang tĩnh
  const staticPages = [
    { loc: 'https://vattukc.com/', changefreq: 'daily', priority: 1.0 },
    { loc: 'https://vattukc.com/login', changefreq: 'monthly', priority: 0.5 },
  ];

  // 🧠 Lấy danh sách sản phẩm từ API thật
  let products: any[] = [];
  try {
    const res = await fetch('https://api.vattukc.com/products', { cache: 'no-store' });
    if (res.ok) {
      products = await res.json();
    }
  } catch (error) {
    console.error('Không lấy được sản phẩm để tạo sitemap:', error);
  }

  const productUrls = products.map((p) => ({
    loc: `https://vattukc.com/product/${p.slug || p.id}`,
    changefreq: 'weekly',
    priority: 0.8,
  }));

  const allUrls = [...staticPages, ...productUrls];

  // 📝 XML sitemap
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allUrls
      .map(
        (url) => `
      <url>
        <loc>${url.loc}</loc>
        <changefreq>${url.changefreq}</changefreq>
        <priority>${url.priority}</priority>
      </url>`
      )
      .join('')}
  </urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

