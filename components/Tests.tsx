'use client';
import React, { useState } from 'react';

function ACT() {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
  
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
            <input type="text" className="text-black" placeholder="Enter your ACT score" onChange={handleInputChange} 
            value={value}/>
            {error && <div className="error-message">{error}</div>}
        </form>
    );

}

function SAT() {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
  
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
            <input type="text" className="text-black" placeholder="Enter your SAT score" onChange={handleInputChange} 
            value={value}/>
            {error && <div className="error-message">{error}</div>}
        </form>
    );

}

function Both() {
    return (
        <div>
            <SAT />
            <ACT />
        </div>
    );
}

export default function Test() {
    const [value, setValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const inputValue = event.target.value;
        setValue(inputValue);
    };

    return (
        <form>
            <div>Test?</div>
            <select name="test" className="text-black" onChange={handleInputChange} value={value}>
            <option value="">Select your test</option>
            <option value="none">None</option>
            <option value="sat">SAT Only</option>
            <option value="act">ACT Only</option>
            <option value="both">Both SAT and ACT</option>
            </select>
            {value === '' && <div></div>}
            {value === 'none' && <div></div>}
            {value === 'sat' && <SAT />}
            {value === 'act' && <ACT />}
            {value === 'both' && <Both />}
        </form>
    );
}