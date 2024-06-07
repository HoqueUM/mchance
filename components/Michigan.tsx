'use client';
import React, { useState, useEffect } from 'react';

interface MichiganProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Michigan({ value: initialValue, onChange }: MichiganProps) {
  const [value, setValue] = useState(initialValue || '');

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <form>
      Are you from Michigan?
      <div>
        <input type="radio" id="yes" name="answer" value="yes" checked={value === 'yes'} onChange={handleInputChange} />
        <label className="option" htmlFor="yes">Yes</label>
      </div>
      <div>
        <input type="radio" id="no" name="answer" value="no" checked={value === 'no'} onChange={handleInputChange} />
        <label className="option" htmlFor="no">No</label>
      </div>
    </form>
  );
}
