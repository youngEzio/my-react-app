// src/components/Question.js
import React, { useState } from 'react';
import AnswerOption from './AnswerOption';

const Question = ({ question }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <h4>{question.questionText}</h4>
      <ul>
        {question.options.map((option) => (
          <AnswerOption
            key={option}
            option={option}
            isSelected={selectedOption === option}
            onSelect={handleOptionSelect}
          />
        ))}
      </ul>
      {selectedOption && (
        <p>
          Your answer: <strong>{selectedOption}</strong>
        </p>
      )}
    </div>
  );
};

export default Question;
