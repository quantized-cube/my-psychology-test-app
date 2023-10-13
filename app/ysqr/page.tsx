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

const labels = [
  'ED',
  'AB',
  'MA',
  'SI',
  'DS',
  'FA',
  'DI',
  'VH',
  'EM',
  'SB',
  'SS',
  'FLC',
  'EC',
  'US',
  'ET',
  'IS',
  'AS',
  'NP',
  'PUS',
  'PUO',
];

const dictLabels: { [key: string]: string } = {
  'ED': '愛情剥奪',
  'AB': '見捨てられ',
  'MA': '不信・虐待',
  'SI': '孤立',
  'DS': '欠陥・恥',
  'FA': '失敗',
  'DI': '無能・依存',
  'VH': 'すべてが怖い',
  'EM': '巻き込まれ',
  'SB': '服従',
  'SS': '自己犠牲',
  'FLC': '自己規制の失敗',
  'EC': '感情抑制',
  'US': '完璧主義',
  'ET': '俺様',
  'IS': 'コントロール不可能',
  'AS': 'ほめられたい',
  'NP': 'ネガティブ注意',
  'PUS': '罰するべき（自分）',
  'PUO': '罰するべき（他人）',
};

// 1-5: ED
const questions_1_ED = [
  "私は十分な愛と注目を浴びていない。",
  "ほとんどの場合、アドバイスや精神的なサポートをしてくれる頼れる人がいなかった。",
  "私の人生の大半は、私に近づき、多くの時間を一緒に過ごしたいと思う人がいなかった。",
  "私の人生の大半は、自分が誰かにとって特別な存在だとは感じてこなかった。",
  "どうしたらいいかわからないときに、的確なアドバイスや方向性を示してくれるような力強い人は、これまでほとんどいなかった。",
];

// 6-13: AB
const questions_2_AB = [
  "親しみを感じている人たちが私のもとを去ったり、私を見捨てたりするのではないかと心配になる。",
  "重要な人間関係が長続きするとは感じない。終わることを期待している。",
  "私は、献身的に私のそばにいることができないパートナーに依存していると感じる。",
  "私は、たとえ短時間であっても、誰かに一人にされると動揺してしまう。",
  "他の人たちと親しくなることはできない、なぜなら彼らがいつもそこにいると確信できないからだ。",
  "私の親しい人たちは、ある瞬間は私に優しく接してくれるが、次の瞬間には怒ったり、動揺したり、自己中心的になったり、ケンカをしたりと、とても予測がつかない。",
  "私は他人を必要とするあまり、他人を失うことを心配する。",
  "ありのままの自分でいることも、本当の気持ちを表現することもできない。さもないと、人々が私から離れてしまう。",
];

// 14-18: MA
const questions_3_MA = [
  "他人の前では油断できないし、そうしないとわざと傷つけられるような気がする。",
  "誰かが私を裏切るのは時間の問題だ。",
  "私は人を信じることがとても苦手だ。",
  "私は他人に“テスト”を課し、彼らが私に真実を語っているか、善意であるかを確認する。",
  "私はこう信じている： 「コントロールするか、されるかだ。」",
];

// 19-23: SI
const questions_4_SI = [
  "私は他の人とは根本的に違う。",
  "私は所属していない。私は一匹狼だ。",
  "私はいつもグループの外側にいると感じている。",
  "誰も私のことを本当には理解してくれない。",
  "私は時々、自分が宇宙人であるかのように感じることがある。",
];

// 24-29: DS
const questions_5_DS = [
  "No one I desire would want to stay close to me if he/she knew the real me. ",
  "I am inherently flawed and defective. ",
  "I feel that I'm not lovable. ",
  "I am too unacceptable in very basic ways to reveal myself to other people.",
  "When people like me, I feel I am fooling them.",
  "I cannot understand how anyone could love me.",
];

// 30-35: FA
const questions_6_FA = [
  "Almost nothing I do at work (or school) is as good as other people can do.  ",
  "Most other people are more capable than I am in areas of work (or school) and achievement. ",
  "I'm a failure.",
  "I'm not as talented as most people are at their work (or at school).",
  "I often feel embarrassed around other people, because I don't measure up to them in terms of my accomplishments. ",
  "I often compare my accomplishments with others and feel that they are much more successful. ",
];

// 36-43: DI
const questions_7_DI = [
  "I do not feel capable of getting by on my own in everyday life.",
  "I believe that other people can take of me better than I can take care of myself.",
  "I have trouble tackling new tasks outside of work unless I have someone to guide me.",
  "I screw up everything I try, even outside of work (or school).",
  "If I trust my own judgment in everyday situations, I'll make the wrong decision.",
  "I feel that I need someone I can rely on to give me advice about practical issues.",
  "I feel more like a child than an adult when it comes to handling everyday responsibilities.",
  "I find the responsibilities of everyday life overwhelming.",
];

// 44-49: VH
const questions_8_VH = [
  "I feel that a disaster (natural, criminal, financial, or medical) could strike at any moment.",
  "I worry about being attacked.",
  "I take great precautions to avoid getting sick or hurt.",
  "I worry that I'm developing a serious illness, even though nothing serious has been diagnosed by a physician.",
  "I worry a lot about the bad things happening in the world: crime, pollution, etc.",
  "I feel that the world is a dangerous place.",
];

// 50-56: EM
const questions_9_EM = [
  "My parent(s) and I tend to be overinvolved in each other's lives and problems.",
  "It is very difficult for my parent(s) and me to keep intimate details from each other, without feeling betrayed or guilty.",
  "My parent(s) and I must speak to each other almost every day, or else one of us feels guilty, hurt, disappointed, or alone.",
  "I often feel that I do not have a separate identity from my parents or partner.",
  "It is very difficult for me to maintain any distance from the people I am intimate with; I have trouble keeping any separate sense of myself.",
  "I often feel that I have no privacy when it comes to my parent(s) or partner.",
  "I feel that my parent(s) are, or would be, very hurt about my living on my own, away from them.",
];

// 57- 61: SB
const questions_10_SB = [
  "I believe that if I do what I want, I'm only asking for trouble.",
  "In relationships, I let the other person have the upper hand.",
  "I've always let others make choices for me, so I really don't know what I want for myself.",
  "I worry a lot about pleasing other people, so they won't reject me.",
  "I will go to much greater lengths than most people to avoid confrontations.",
];

// 62-67: SS
const questions_11_SS = [
  "I give more to other people than I get back in return.",
  "I'm the one who usually ends up taking care of the people I'm close to.",
  "No matter how busy I am, I can always find time for others.",
  "I've always been the one who listens to everyone else's problems.",
  "Other people see me as doing too much for others and not enough for myself.",
  "No matter how much I give; I feel it is never enough.",
];

// 68-71: FLC
const questions_12_FLC = [
  "I worry about losing control of my actions.",
  "I worry that I might seriously harm someone physically or emotionally if my anger gets out of control.",
  "I feel that I must control my emotions and impulses, or something bad is likely to happen.",
  "A lot of anger and resentment build up inside of me that I don't express.",
];

// 72-76:EC
const questions_13_EC = [
  "I am too self-conscious to show positive feelings to others (e.g., affection, showing I care).",
  "I find it embarrassing to express my feelings to others.",
  "I find it hard to be warm and spontaneous.",
  "I control myself so much that people think I am unemotional.",
  "People see me as uptight emotionally.",
];

// 77-83: US
const questions_14_US = [
  "I must be the best at most of what I do; I can't accept second best. ",
  "I strive to keep almost everything in perfect order.  ",
  "I have so much to accomplish that there is almost no time to really relax.",
  "I must meet all my responsibilities.",
  "I often sacrifice pleasure and happiness to meet my own standards.",
  "I can't let myself off the hook easily or make excuses for my mistakes.",
  "I always must be Number One, in terms of my performance.",
];

// 84-89: ET
const questions_15_ET = [
  "I have a lot of trouble accepting \"no\" for an answer when I want something from other people.",
  "I hate to be constrained or kept from doing what I want.",
  "I feel that I shouldn't have to follow the normal rules and conventions other people do. ",
  "I often find that I am so involved in my own priorities that I don't have time to give to friends or family.",
  "People often tell me I am very controlling about the ways things are done.",
  "I can't tolerate other people telling me what to do.",
];

// 90-94: IS
const questions_16_IS = [
  "I can't seem to discipline myself to complete routine or boring tasks.",
  "Often I allow myself to carry through on impulses and express emotions that get me into trouble or hurt other people.",
  "I get bored very easily.",
  "When tasks become difficult, I usually cannot persevere and complete them.",
  "I can't force myself to do things I don't enjoy, even when I know it's for my own good.",
  "I have rarely been able to stick to my resolutions.",
  "I often do things impulsively that I later regret.",
];

// 97-101: AS
const questions_17_AS = [
  "It is important to me to be liked by almost everyone I know.",
  "I change myself depending on the people I'm with, so they'll like me more.",
  "My self-esteem is based mostly on how other people view me.",
  "Even if I don't like someone, I still want him or her to like me.",
  "Unless I get a lot of attention from others, I feel less important.",
];

// 102-107: NP
const questions_18_NP = [
  "You can't be too careful; something will almost always go wrong.",
  "I worry that a wrong decision could lead to disaster.",
  "I often obsess over minor decisions, because the consequences of making a mistake seem so serious.",
  "I feel better assuming things will not work out for me, so that I don't feel disappointed if things go wrong.",
  "I tend to be pessimistic.",
  "If people get too enthusiastic about something, I become uncomfortable and feel like warning them of what could go wrong.",
];

// 108-112: PUS
const questions_19_PUS = [
  "If I make a mistake, I deserve to be punished.",
  "There is no excuse if I make mistake.",
  "If I don't do the job, I should suffer the consequences.",
  "It doesn't matter why I make a mistake; when I do something wrong, I should pay the price.",
  "I'm a bad person who deserves to be punished.",
];

// 113-116: PUO
const questions_20_PUO = [
  "People who don't \"pull their own weight\" should get punished in some way.",
  "Most of the time, I don't accept the excuses other people make. They're just not willing to accept responsibility and pay the consequences.",
  "I hold grudges, even after someone has apologized.",
  "I get angry when people make excuses for themselves or blame other people for their problems.",
];

const a_questions = [
  questions_1_ED,
  questions_2_AB,
  questions_3_MA,
  questions_4_SI,
  questions_5_DS,
  questions_6_FA,
  questions_7_DI,
  questions_8_VH,
  questions_9_EM,
  questions_10_SB,
  questions_11_SS,
  questions_12_FLC,
  questions_13_EC,
  questions_14_US,
  questions_15_ET,
  questions_16_IS,
  questions_17_AS,
  questions_18_NP,
  questions_19_PUS,
  questions_20_PUO,
];
const questions = a_questions.flat();

const lengths = a_questions.map((question) => question.length)
const cumLengths = [0, ...lengths.map((sum => value => sum += value)(0))]

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

  const averageScores: number[] = [];
  for (let i = 0; i < cumLengths.length - 1; i++) {
    const start = cumLengths[i];
    const end = cumLengths[i + 1];
    const length = lengths[i];
    const averageScore = scores.slice(start, end).reduce((acc, score) => acc + score, 0) / length;
    averageScores.push(averageScore);
  }
  const pairLabelsAverageScores = labels.map((label, index) => [label, averageScores[index]]);
  // 一旦オブジェクトに変換
  const objLabelsAverageScores: { [key: string]: number } = Object.fromEntries(pairLabelsAverageScores);
  // キーを含んだ配列に変換
  const array = Object.keys(objLabelsAverageScores).map((k) => ({ key: k, value: objLabelsAverageScores[k] }));
  // スコアの降順
  array.sort((a, b) => b.value - a.value);
  // オブジェクトに戻す
  const sortedObjLabelsAverageScores = Object.assign({}, ...array.map((item) => ({
    [item.key]: item.value,
  })));
  // スコアの降順のラベル
  const sortedLabels = Object.keys(sortedObjLabelsAverageScores);
  // スコアの降順のスコア
  const sortedAverageScores = Object.values(sortedObjLabelsAverageScores);

  const resultMessages: string[] = [];
  for (let i = 0; i < cumLengths.length - 1; i++) {
    const resultMessage = `${labels[i]}のスコア ${averageScores[i].toFixed(2)}`;
    resultMessages.push(resultMessage);
  }

  const handleShowResults = () => {
    // 結果を表示するボタンをクリックしたら結果を表示
    setShowResults(true);
  };

  const handleToggleSort = () => {
    // スコアのソート順を切り替える
    setSortDescending(!sortDescending);
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
        grid: {
          lineWidth: (ctx: any) => [4].includes(ctx.tick.value) ? 4 : 2,
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
        text: 'あなたのスキーマの得点',
      },
    },
  };
  const barChartData = {
    labels: sortDescending ? sortedLabels : labels,
    datasets: [
      {
        label: 'スコア',
        data: sortDescending ? sortedAverageScores : averageScores,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: (context: any) => {
          const score: any = sortDescending
            ? sortedAverageScores[context.dataIndex]
            : averageScores[context.dataIndex];
          // スコアが4以上の場合に色を変える
          return score >= 4 ? 'rgba(200, 55, 80, 0.8)' : 'rgba(255, 99, 132, 0.4)';
        },
        borderWidth: 3,
        hoverBackgroundColor: (context: any) => {
          const score: any = sortDescending
            ? sortedAverageScores[context.dataIndex]
            : averageScores[context.dataIndex];
          // スコアが4以上の場合に色を変える
          return score >= 4 ? 'rgba(60, 150, 150, 0.8)' : 'rgba(80, 200, 200, 0.8)';
        },
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  return (
    <div>
      <Head>
        <title>YSQ-R</title>
        <meta name="description" content="Young Schema Questionnaire - Revised (YSQ-R)" />
      </Head>

      <main>
        <h1>YSQ-R</h1>
        <p>
          Young Schema Questionnaire - Revised
        </p>
        <p>
          以下に挙げるのは、誰かが自分自身を説明するために使いそうな文です。それぞれの文章を読んで、どの程度自分を表しているか判断してください。判断に迷う場合は、あなたが真実だと<strong>思う</strong>ことではなく、あなたが感情的に<strong>感じる</strong>ことを基にしてください。あなたを表す<strong>最も高い評価を1～6</strong>の中から選んでください。
        </p>
        <p>
          1 = まったく当てはまらない
        </p>
        <p>
          2 = ほとんど当てはまらない
        </p>
        <p>
          3 = どちらかと言えば当てはまる
        </p>
        <p>
          4 = まぁまぁ当てはまる
        </p>
        <p>
          5 = ほとんど当てはまる
        </p>
        <p>
          6 = 完璧に当てはまる
        </p>

        {questions.map((question, index) => (
          <div key={index}>
            {cumLengths.includes(index) && <hr style={{ margin: '30px' }} />}
            {cumLengths.includes(index) && <h2>{labels[cumLengths.indexOf(index)]}</h2>}
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
            <button onClick={handleToggleSort}>{sortDescending ? '質問順に並べ替え' : '降順に並べ替え'}</button>
            <div className="mx-auto max-w-min">
              <Bar // 棒グラフを表示
                data={barChartData}
                // width={600}
                height={500}
                options={options}
              />
            </div>
            {labels.map((label, index) => (
              <div key={label}>
                <p>{label} {dictLabels[label]}スキーマ：{averageScores[index].toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
        <hr style={{ margin: '30px' }} />
        <p>
          出典：以下のサイト
        </p>
        <p>
          <Link href="https://psychology-training.com.au/schema-therapy-training/resource-material-links/">
            https://psychology-training.com.au/schema-therapy-training/resource-material-links/
          </Link>
        </p>
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