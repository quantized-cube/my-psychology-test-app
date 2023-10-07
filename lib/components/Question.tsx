'use client'

import { useState } from 'react';

type QuestionProps = {
  question: string;
  onAnswer: (score: number) => void;
};

const Question: React.FC<QuestionProps> = ({ question, onAnswer }) => {
  const [selectedScore, setSelectedScore] = useState<number | null>(null);

  const handleAnswer = (score: number) => {
    setSelectedScore(score);
    onAnswer(score);
  };

  return (
    <div>
      <h2>{question}</h2>
      <div>
        {[1, 2, 3, 4, 5, 6].map((score) => (
          <button
            key={score}
            onClick={() => handleAnswer(score)}
            className={selectedScore === score ? 'selected' : ''}
          >
            {score}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
