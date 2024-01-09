import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: '心理テストまとめ',
  description: '心理テストのサンプル',
}

export default function Home() {
  return (
    <div>
      <main>
        <h1>心理テストまとめ</h1>
        <ul>
          <li>
            <Link href="/tipi-j">
              TIPI-J
            </Link>
          </li>
          <li>
            <Link href="/ysq-r">
              YSQ-R
            </Link>
          </li>
          <li>
            <Link href="/career-anchors">
              キャリア・アンカー
            </Link>
          </li>
          <li>
            <a href="/time-perspective">
              時間志向チェックテスト
            </a>
            <p style={{ fontSize: '0.8rem' }}>パスワード：10問目の最初5文字をアルファベット半角小文字</p>
          </li>
        </ul>
      </main>
    </div>
  );
}