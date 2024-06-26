'use client';
import React, { useState, useEffect } from 'react';

interface GPAProps {
  value: string;
  onChange: (value: string) => void;
}

export default function GPA({ value: initialValue, onChange }: GPAProps) {
  const [value, setValue] = useState(initialValue || '');
  const [error, setError] = useState('');

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
    } else if (numberValue < 0.0 || numberValue > 6.0) {
      setError('Input is not within the range [0.0, 6.0]');
    } else {
      setError('');
    }

    setValue(inputValue);
  };

  return (
    <form>
      <div>GPA?</div>
      <input
        type="text"
        className="text-black"
        placeholder="Enter your GPA"
        value={value}
        onChange={handleInputChange}
      />
      {error && <div className="error-message">{error}</div>}
    </form>
  );
}
