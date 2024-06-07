'use client';
import React from 'react';
import SAT from './SAT';
import ACT from './ACT';

interface BothProps {
  satValue: string;
  actValue: string;
  onSATChange: (value: string) => void;
  onACTChange: (value: string) => void;
}

export default function Both({ satValue, actValue, onSATChange, onACTChange }: BothProps) {
  return (
    <div>
      <SAT value={satValue} onChange={onSATChange} />
      <ACT value={actValue} onChange={onACTChange} />
    </div>
  );
}
