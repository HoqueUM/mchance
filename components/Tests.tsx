'use client';
import React, { useState, useEffect } from 'react';
import SAT from './SAT';
import ACT from './ACT';
import Both from './Both';

interface TestProps {
  value: string;
  onChange: (value: string) => void;
  onTestTypeChange: (testType: string) => void; // New prop for notifying the parent component
}

export default function Test({ value: initialValue, onChange, onTestTypeChange }: TestProps) {
  const [testType, setTestType] = useState(initialValue || '');
  const [satValue, setSatValue] = useState('');
  const [actValue, setActValue] = useState('');

  useEffect(() => {
    setTestType(initialValue || ''); // Rehydrate state from props
  }, [initialValue]);

  useEffect(() => {
    onChange(testType);
    onTestTypeChange(testType); // Notify parent component about the change in test type
  }, [testType, onChange, onTestTypeChange]);

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const inputValue = event.target.value;
    setTestType(inputValue);
  };

  const handleSATChange = (value: string) => {
    setSatValue(value);
  };

  const handleACTChange = (value: string) => {
    setActValue(value);
  };

  return (
    <form>
      <div>Test?</div>
      <select name="test" className="text-black" onChange={handleInputChange} value={testType}>
        <option value="">Select your test</option>
        <option value="none">None</option>
        <option value="sat">SAT Only</option>
        <option value="act">ACT Only</option>
        <option value="both">Both SAT and ACT</option>
      </select>
      {testType === 'sat' && <SAT value={satValue} onChange={handleSATChange} />}
      {testType === 'act' && <ACT value={actValue} onChange={handleACTChange} />}
      {testType === 'both' && (
        <Both
          satValue={satValue}
          actValue={actValue}
          onSATChange={handleSATChange}
          onACTChange={handleACTChange}
        />
      )}
    </form>
  );
}
