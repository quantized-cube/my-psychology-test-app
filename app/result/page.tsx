'use client'

import { useState } from 'react';
import Head from 'next/head';
import Question from '@/lib/components/Question';
import Result from '@/lib/components/Result';

export default function Home() {
  const [scores, setScores] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswer = (score: number) => {
    const newScores = [...scores];
    newScores[currentQuestionIndex] = score;
    setScores(newScores);

  };

  const totalScore_1 = scores.slice(0, 2).reduce((acc, score) => acc + score, 0);
  const totalScore_2 = scores.slice(2, 4).reduce((acc, score) => acc + score, 0);
  const totalScores = [totalScore_1, totalScore_2];

  return (
    <div>
      <Head>
        <title>心理テスト</title>
        <meta name="description" content="心理テストのサンプル" />
      </Head>

      <main>
        <Result totalScores={totalScores} />
      </main>
    </div>
  );
}