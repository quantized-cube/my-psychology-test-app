'use client'

import Head from 'next/head';
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Head>
        <title>心理テストまとめ</title>
        <meta name="description" content="心理テストのサンプル" />
      </Head>

      <main>
        <h1>心理テストまとめ</h1>
        <Link href="/test01">
          心理テスト01
        </Link>
      </main>
    </div>
  );
}