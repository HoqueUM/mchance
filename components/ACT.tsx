'use client';
import React, { useState, useEffect } from 'react';

interface ACTProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ACT({ value: initialValue, onChange }: ACTProps) {
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
    } else if (numberValue < 0 || numberValue > 36) {
      setError('Input is not within the range [0, 36]');
    } else if (numberValue % 1 !== 0) {
      setError('Input is not a multiple of 1');
    } else {
      setError('');
    }

    setValue(inputValue);
  };

  return (
    <form>
      <div>ACT Score?</div>
      <input
        type="text"
        className="text-black"
        placeholder="Enter your ACT score"
        onChange={handleInputChange}
        value={value}
      />
      {error && <div className="error-message">{error}</div>}
    </form>
  );
}
