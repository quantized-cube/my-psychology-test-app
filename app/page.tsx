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
            <Link href="/test01">
              心理テスト01
            </Link>
          </li>
          <li>
            <Link href="/test02">
              心理テスト02
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
}