'use client';
import React, { useState, useEffect } from 'react';

interface IncomeProps {
  onChange: (value: string) => void;
}

export default function Income({ onChange }: IncomeProps) {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        onChange(value);
    }, [value]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const numberValue = parseInt(inputValue);

        if (inputValue == '') {
            setError('');
        }
        else  if (isNaN(numberValue)) {
            setError('Input is not a number');
        }
        else if (numberValue < 0) {
            setError('Input is not a positive number');
        }
        else {
            setError('');
        }
        setValue(inputValue);
    };

    return (
        <form>
            <div>Income?</div>
            <input type="text" className="text-black" placeholder="Enter your income"
            value={value} onChange={handleInputChange}/>
            {error && <div className="error-message">{error}</div>}
        </form>
    );
}