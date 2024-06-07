'use client';
import React, { useState, useEffect } from 'react';

interface SATProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SAT({ value: initialValue, onChange }: SATProps) {
  const [value, setValue] = useState(initialValue || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setValue(initialValue || ''); // Rehydrate state from props
  }, [initialValue]);

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numberValue = parseFloat(inputValue);

    if (inputValue === '') {
      setError('');
    } else if (isNaN(numberValue)) {
      setError('Input is not a number');
    } else if (numberValue < 0 || numberValue > 1600) {
      setError('Input is not within the range [0, 1600]');
    } else if (numberValue % 10 !== 0) {
      setError('Input is not a multiple of 10');
    } else {
      setError('');
    }

    setValue(inputValue);
  };

  return (
    <form>
      <div>SAT Score?</div>
      <input
        type="text"
        className="text-black"
        placeholder="Enter your SAT score"
        onChange={handleInputChange}
        value={value}
      />
      {error && <div className="error-message">{error}</div>}
    </form>
  );
}
