'use client'

import { useState } from 'react';
import Head from 'next/head';
import Question from '@/lib/components/Question';
import Result from '@/lib/components/Result';

const questions = [
  '質問1: このテストは役に立つと思いますか？',
  '質問2: このテストは難しいと思いますか？',
  '質問3: このテストは楽しいと思いますか？',
  '質問4: このテストは悲しいと思いますか？',
  // 他の質問をここに追加
];

export default function Home() {
  const [scores, setScores] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswer = (score: number) => {
    const newScores = [...scores];
    newScores[currentQuestionIndex] = score;
    setScores(newScores);

    // 最後の質問でない場合、次の質問へ進む
    // 最後の質問の場合、結果へ進む
    if (currentQuestionIndex < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
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
        {currentQuestionIndex < questions.length ? (
          <Question
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
          />
        ) : (
          <Result totalScores={totalScores} />
        )}
      </main>
    </div>
  );
}