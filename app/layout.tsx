import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Link className='header' href="/">トップページ</Link>
        {children}
        <Link className='footer' href="https://twitter.com/quantized_cube" target="_blank">Contact: X (Twitter)</Link>
        <Link className='footer' href="/">トップページ</Link>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
