'use client'

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link'
import { Radar } from 'react-chartjs-2'; // react-chartjs-2をインポート
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PolarAreaController,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PolarAreaController,
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  '外向性',
  '協調性',
  '勤勉性',
  '神経症傾向',
  '開放性',
];

const questions = [
  '活発で、外向的だと思う',
  '他人に不満をもち、もめごとを起こしやすいと思う',
  'しっかりしていて、自分に厳しいと思う',
  '心配性で、うろたえやすいと思う',
  '新しいことが好きで、変わった考えをもつと思う',
  'ひかえめで、おとなしいと思う',
  '人に気をつかう、やさしい人間だと思う',
  'だらしなく、うっかりしていると思う',
  '冷静で、気分が安定していると思う',
  '発想力に欠けた、平凡な人間だと思う',
];

export default function Home() {
  const [scores, setScores] = useState<number[]>(Array(questions.length).fill(0));
  const [showResults, setShowResults] = useState(false); // 結果を表示するための状態
  const shouldShowResultsButton = scores.every((score) => score !== 0); // scoresに0が含まれていないかチェック
  const [sortDescending, setSortDescending] = useState(false); // スコアの降順ソートトグル

  const handleAnswer = (index: number, score: number) => {
    const newScores = [...scores];
    newScores[index] = score;
    setScores(newScores);
  };

  const resultScores: number[] = [
    scores[0] + 8 - scores[5],
    8 - scores[1] + scores[6],
    scores[2] + 8 - scores[7],
    scores[3] + 8 - scores[8],
    scores[4] + 8 - scores[9],
  ];

  const resultMessages: string[] = [];
  for (let i = 0; i < 5; i++) {
    const resultMessage = `${labels[i]}のスコア ${resultScores[i]}`;
    resultMessages.push(resultMessage);
  }

  const handleShowResults = () => {
    // 結果を表示するボタンをクリックしたら結果を表示
    setShowResults(true);
  };

  // 棒グラフのデータ
  const options = {
    // elements: {
    //   line: {
    //     borderWidth: 5,
    //   },
    // },
    scales: {
      r: {
        angleLines: {
          display: true
        },
        min: 0,
        max: 14,
        ticks: {
          stepSize: 2
        }
      },
    },
    maintainAspectRatio: false,
    responsive: true,
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
  const radarChartData = {
    labels: labels,
    datasets: [
      {
        label: 'スコア',
        data: resultScores,
        fill: true,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        // borderWidth: 3,
        pointHoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  return (
    <div>
      <Head>
        <title>TIPI-J</title>
        <meta name="description" content="TIPI-Jのテスト" />
      </Head>

      <main>
        <h1>TIPI-J</h1>
        <p>
          https://gosling.psy.utexas.edu/wp-content/uploads/2014/09/2012TIPI_J.pdf
        </p>
        <p>
          私は自分自身のことを……
        </p>
        <p>
          1 = 全く違うと思う
          ……
          7 = 強くそう思う
        </p>

        {questions.map((question, index) => (
          <div key={index}>
            <h3>{question}</h3>
            {[1, 2, 3, 4, 5, 6, 7].map((score) => (
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
              <Radar
                data={radarChartData}
                // width={50}
                height={500}
                options={options}
              />
            </div>
            {labels.map((label, index) => (
              <div key={label}>
                {/* <p>{resultMessages[index]}</p> */}
                <p>{label}: {resultScores[index]}</p>
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