'use client'

type ResultProps = {
  totalScores: number[];
};

const Result: React.FC<ResultProps> = ({ totalScores }) => {
  // ここで合計スコアに基づいて結果を判定するロジックを追加できます
  const resultMessage1 = `1と2の合計スコア ${totalScores[0]}`;
  const resultMessage2 = `3と4の合計スコア ${totalScores[1]}`;

  return (
    <div>
      <h2>結果</h2>
      <p>テスト結果：</p>
      <h3>結果1</h3>
      <p>{resultMessage1}</p>
      <h3>結果2</h3>
      <p>{resultMessage2}</p>
    </div>
  );
};

export default Result;
