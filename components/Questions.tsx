'use client';
import React, { useState } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const questions = [
  {
    text: 'GPA, please.',
    type: 'text',
    validate: (value: string) => {
      const numberValue = parseFloat(value);
      if (isNaN(numberValue)) {
        return 'Input is not a number';
      } else if (numberValue < 0.0 || numberValue > 6.0) {
        return 'Input is not within the range [0.0, 6.0]';
      } else {
        return '';
      }
    }
  },
  {
    text: 'SAT score, please.',
    type: 'text',
    validate: (value: string) => {
      const numberValue = parseInt(value);
      if (isNaN(numberValue)) {
        return 'Input is not a number';
      } else if (numberValue < 0 || numberValue > 1600) {
        return 'Input is not within the range [0.0, 6.0]';
      } else if (numberValue % 10 != 0) {
        return 'Input is not a multiple of 10';
      } else {
        return '';
      }
    }
  },
  {
    text: 'ACT score, please.',
    type: 'text',
    validate: (value: string) => {
      const numberValue = parseInt(value);
      if (isNaN(numberValue)) {
        return 'Input is not a number';
      } else if (numberValue < 0 || numberValue > 36) {
        return 'Input is not within the range [0.0, 6.0]';
      } else if (numberValue % 1 != 0) {
        return 'Input is not a multiple of 1';
      } else {
        return '';
      }
    }
  },
  // Add more questions here
];

export default function Questions() {
  const [inputValues, setInputValues] = useState(Array(questions.length).fill(''));
  const [errorMessage, setErrorMessage] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValues = [...inputValues];
    newInputValues[currentQuestionIndex] = event.target.value;
    setInputValues(newInputValues);
    if (event.target.value === '') {
      setErrorMessage('');
    } else {
      const error = questions[currentQuestionIndex].validate(event.target.value);
      setErrorMessage(error);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!errorMessage) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p>{questions[currentQuestionIndex].text}</p>
      <form onSubmit={handleSubmit}>
        <input 
          type={questions[currentQuestionIndex].type} 
          value={inputValues[currentQuestionIndex]} 
          onChange={handleInputChange}
          className='text-black' 
        />
        {currentQuestionIndex > 0 && <button type="button" onClick={handleBack}><IoIosArrowBack /></button>}
        {currentQuestionIndex < questions.length - 1 ? (
          <button type="submit" disabled={!inputValues[currentQuestionIndex] || !!errorMessage}><IoIosArrowForward /></button>
        ) : (
          <button type="submit" disabled={!inputValues[currentQuestionIndex] || !!errorMessage}>Submit</button>
        )}
      </form>
      {errorMessage && <p className="error-message text-red-500 text-center">{errorMessage}</p>}
    </div>
  );
};