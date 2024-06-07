'use client';
import React, { useState, useEffect } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import GPA from './GPA';
import Test from './Tests';
import Michigan from './Michigan';
import Income from './Income';
import SAT from './SAT';
import ACT from './ACT';
import Both from './Both';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const initialQuestions = [
  { component: GPA, key: 'gpa' },
  { component: Test, key: 'test' },
  { component: Michigan, key: 'michigan' },
  { component: Income, key: 'income' },
];

export default function Questions() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState(Array(initialQuestions.length).fill(null));
  const [direction, setDirection] = useState('forward');
  const [questions, setQuestions] = useState(initialQuestions);

  // Handle the change in the Test component response
  const handleTestTypeChange = (testType) => {
    let newQuestions = [...initialQuestions];
    // Remove the existing SAT or ACT component, if any
    newQuestions = newQuestions.filter(q => q.key !== 'sat' && q.key !== 'act' && q.key !== 'both');
    
    if (testType === 'sat') {
      newQuestions.splice(2, 0, { component: SAT, key: 'sat' });
    } else if (testType === 'act') {
      newQuestions.splice(2, 0, { component: ACT, key: 'act' });
    } else if (testType === 'both') {
      newQuestions.splice(2, 0, { component: Both, key: 'both' });
    }
    
    setQuestions(newQuestions);
    // Ensure responses array accommodates new questions length
    setResponses(prevResponses => [...prevResponses, ...Array(newQuestions.length - prevResponses.length).fill(null)]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentQuestionIndex < questions.length - 1) {
      setDirection('forward');
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log('Form responses:', responses);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setDirection('backward');
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleResponseChange = (index, response) => {
    setResponses(prevResponses => {
      const newResponses = [...prevResponses];
      newResponses[index] = response;
      return newResponses;
    });
  };

  const CurrentComponent = questions[currentQuestionIndex].component;
  const currentResponse = responses[currentQuestionIndex];

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className="relative w-full" style={{ height: '200px' }}>
          <TransitionGroup>
            <CSSTransition
              key={currentQuestionIndex}
              timeout={500}
              classNames={direction === 'forward' ? 'fade-forward' : 'fade-backward'}
            >
              <div className="w-full h-full">
                <CurrentComponent 
                  value={currentResponse} 
                  onChange={response => handleResponseChange(currentQuestionIndex, response)} 
                  onTestTypeChange={handleTestTypeChange} // Pass the handler to Test component
                />
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
        <div className="mt-4 flex justify-between w-full">
          {currentQuestionIndex > 0 && (
            <button type="button" onClick={handleBack} className="flex items-center justify-center p-2 bg-gray-300 rounded">
              <IoIosArrowBack />
            </button>
          )}
          {currentQuestionIndex < questions.length - 1 ? (
            <button type="submit" className="flex items-center justify-center p-2 bg-blue-500 text-white rounded">
              <IoIosArrowForward />
            </button>
          ) : (
            <button type="submit" className="p-2 bg-green-500 text-white rounded">Submit</button>
          )}
        </div>
      </form>
    </div>
  );
}
