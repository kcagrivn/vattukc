import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vattukc',
  description: 'Vật tư nông nghiệp - Vattukc.com',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}

