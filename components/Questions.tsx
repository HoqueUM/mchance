'use client';
import React, { useState } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import GPA from './GPA';
import Test from './Tests';
import Michigan from './Michigan';
import Income from './Income';

const questions = [
  { component: GPA },
  { component: Test },
  { component: Michigan },
  { component: Income },
];

export default function Questions() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState(Array(questions.length).fill(null));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleResponseChange = (index: number, response: any) => {
    setResponses(prevResponses => {
      const newResponses = [...prevResponses];
      newResponses[index] = response;
      return newResponses;
    });
  };

  const CurrentComponent = questions[currentQuestionIndex].component;

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit}>
        <CurrentComponent onChange={response => handleResponseChange(currentQuestionIndex, response)} />
        {currentQuestionIndex > 0 && <button type="button" onClick={handleBack}><IoIosArrowBack /></button>}
        {currentQuestionIndex < questions.length - 1 ? (
          <button type="submit"><IoIosArrowForward /></button>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>
    </div>
  );
};