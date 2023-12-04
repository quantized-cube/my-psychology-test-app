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
            <Link href="/careeranchors">
              キャリア・アンカー
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
}