// src/components/AnswerOption.js
import React from 'react';

const AnswerOption = ({ option, isSelected, onSelect }) => {
  return (
    <li
      style={{ cursor: 'pointer', fontWeight: isSelected ? 'bold' : 'normal' }}
      onClick={() => onSelect(option)}
    >
      {option}
    </li>
  );
};

export default AnswerOption;
