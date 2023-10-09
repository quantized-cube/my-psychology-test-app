'use client'

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link'
import { Bar } from 'react-chartjs-2'; // react-chartjs-2をインポート
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['ED', 'AB', 'MA'];

// 1-5: ED
const questions_1_ED = [
  'I haven\'t gotten enough love and attention.',
  'For the most part, I haven\'t had someone to depend on for advice and emotional support.',
  'For much of my life, I haven\'t had someone who wanted to get close to me and spend a lot of time with me.',
  'For much of my life, I haven\'t felt that I am special to someone. ',
  'I have rarely had a strong person to give me sound advice or direction when I\'m not sure what to do.',
];

// 6-13: AB
const questions_2_AB = [
  'I worry that people I feel close to will leave me or abandon me.',
  'I don\'t feel that important relationships will last; I expect them to end.',
  'hogehoge',
  'hogehoge',
  'hogehoge',
  'hogehoge',
  'hogehoge',
  'hogehoge',
];

// 14-18: MA
const questions_3_MA = [
  'fugafuga',
  'fugafuga',
  'fugafuga',
  'fugafuga',
  'fugafuga',
];

const questions = questions_1_ED.concat(questions_2_AB, questions_3_MA);

const lengths = [questions_1_ED.length, questions_2_AB.length, questions_3_MA.length]
const cum_lengths = [0, ...lengths.map((sum => value => sum += value)(0))]

export default function Home() {
  const [scores, setScores] = useState<number[]>(Array(questions.length).fill(0));
  const [showResults, setShowResults] = useState(false); // 結果を表示するための状態
  const shouldShowResultsButton = scores.every((score) => score !== 0); // scoresに0が含まれていないかチェック

  const handleAnswer = (index: number, score: number) => {
    const newScores = [...scores];
    newScores[index] = score;
    setScores(newScores);
  };

  const averageScores = [];
  for (let i = 0; i < cum_lengths.length - 1; i++) {
    const start = cum_lengths[i];
    const end = cum_lengths[i + 1];
    const length = lengths[i];
    const averageScore = scores.slice(start, end).reduce((acc, score) => acc + score, 0) / length;
    averageScores.push(averageScore);
  }

  const resultMessages: string[] = [];
  for (let i = 0; i < cum_lengths.length - 1; i++) {
    const resultMessage = `${labels[i]}のスコア ${averageScores[i].toFixed(2)}`;
    resultMessages.push(resultMessage);
  }

  const handleShowResults = () => {
    // 結果を表示するボタンをクリックしたら結果を表示
    setShowResults(true);
  };

  // 棒グラフのデータ
  const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 5,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        min: 0,
        max: 7,
        ticks: {
          stepSize: 1,
        },
      }
    },
    plugins: {
      legend: {
        // position: 'right' as const,
        display: false,
      },
      title: {
        display: true,
        text: '結果のグラフ',
      },
    },
  };
  const barChartData = {
    labels: labels, // カテゴリーデータを設定
    datasets: [
      {
        label: 'スコア',
        data: averageScores,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 3,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  return (
    <div>
      <Head>
        <title>心理テスト01</title>
        <meta name="description" content="心理テストのサンプル" />
      </Head>

      <main>
        <h1>YSQ-R</h1>
        <p>
          https://psychology-training.com.au/schema-therapy-training/resource-material-links/
        </p>
        <p>
          1 = まったく当てはまらない
          ……
          6 = 完璧に当てはまる
        </p>

        {questions.map((question, index) => (
          <div key={index}>
            {index === 0 && <hr style={{ margin: '30px' }} />}
            {index === lengths[0] && <hr style={{ margin: '30px' }} />}
            {index === lengths[0] + lengths[1] && <hr style={{ margin: '30px' }} />}
            {index === 0 && <h2>ED</h2>}
            {index === lengths[0] && <h2>AB</h2>}
            {index === lengths[0] + lengths[1] && <h2>MA</h2>}
            <h3>{question}</h3>
            {[1, 2, 3, 4, 5, 6].map((score) => (
              <button
                key={score}
                onClick={() => handleAnswer(index, score)}
                className={scores[index] === score ? 'selected' : ''}
                disabled={showResults} // 結果表示中はボタンを無効化
              >
                {score}
              </button>
            ))}
          </div>
        ))}
        {shouldShowResultsButton && <hr style={{ margin: '30px' }} />}
        {shouldShowResultsButton && !showResults && (
          <div style={{ marginTop: '30px' }}>
            <button onClick={handleShowResults}>結果を表示</button>
          </div>
        )}
        {showResults && ( // 結果を表示する場合に表示
          <div>
            <h2>結果</h2>
            <div className="mx-auto max-w-min">
              <Bar // 棒グラフを表示
                data={barChartData}
                // width={600}
                height={150}
                options={options}
              />
            </div>
            {labels.map((label, index) => (
              <div key={label}>
                <h3>結果{label}</h3>
                <p>{resultMessages[index]}</p>
              </div>
            ))}
          </div>
        )}
        <hr style={{ margin: '30px' }} />
        <div style={{ fontSize: '16px', margin: '30px' }}>
          <Link href="/">
            トップページに戻る
          </Link>
        </div>
      </main>
    </div>
  );
}