'use client'

import Head from 'next/head';
import Link from 'next/link'
import './globals.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>心理テストまとめ</title>
        <meta name="description" content="心理テストのサンプル" />
      </Head>

      <main>
        <h1>心理テストまとめ</h1>
        <ul>
          <li>
            <Link href="/tipij">
              TIPI-J
            </Link>
          </li>
          <li>
            <Link href="/ysqr">
              YSQ-R
            </Link>
          </li>
          <li>
            <Link href="/career-anchors">
              キャリア・アンカー
            </Link>
          </li>
          <li>
            <Link href="/time-perspective">
              時間志向チェックテスト
            </Link>
            <p style={{ fontSize: '0.8rem' }}>パスワード：10問目の最初5文字をアルファベット半角小文字</p>
          </li>
        </ul>
      </main>
    </div>
  );
}