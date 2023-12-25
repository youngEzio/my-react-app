// src/components/Quiz.js
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Question from './Question';

const Quiz = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [questions, setQuestions] = useState([
    {
      id: 1,
      questionText: 'What is the capital of France?',
      options: ['Paris', 'Berlin', 'London', 'Madrid'],
      correctOption: 'Paris',
    }, 
  ]);
  const [userAnswers, setUserAnswers] = useState({});
  const [feedback, setFeedback] = useState('');


  useEffect(() => {
    // Fetch exercises based on the selected language
    if (selectedLanguage) {
      axios.get(`http://localhost:5000/api/exercises?language=${selectedLanguage}`)
        .then((response) => setQuestions(response.data))
        .catch((error) => console.error(error));
    }
  }, [selectedLanguage]);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setFeedback('');
  };

  const handleAnswerSubmit = () => {
    // Send user answers to the backend
    axios.post('http://localhost:5000/api/evaluate', { language: selectedLanguage, answers: userAnswers })
      .then((response) => {
        setFeedback(response.data.feedback);
        // Update user proficiency and completed exercises in the frontend state
        // This can be further enhanced with a backend call to update the user model
        if (response.data.shouldLevelUp) {
          // Fetch new set of questions with increased difficulty
          axios.get(`http://localhost:5000/api/exercises?language=${selectedLanguage}`)
            .then((response) => setQuestions(response.data))
            .catch((error) => console.error(error));
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Language Learning Quiz</h2>
      <p>Choose a language:</p>
      <select onChange={(e) => handleLanguageSelect(e.target.value)}>
        <option value="">Select Language</option>
        <option value="english">English</option>
        <option value="french">French</option>
        {/* Add more languages as needed */}
      </select>
      {selectedLanguage && (
        <>
          <h3>Instructions:</h3>
          <p>
            Welcome to the {selectedLanguage} language learning quiz. Answer the
            following questions to test your proficiency.
          </p>
          {questions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
        </>
      )}
      <button onClick={handleAnswerSubmit}>Submit Answers</button>
      <p>{feedback}</p>
    </div>
  );
};

export default Quiz;

