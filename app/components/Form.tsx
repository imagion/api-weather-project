'use client';

import { useState } from 'react';

interface FormProps {
  setCity: (city: string) => void;
}

export default function Form({ setCity }: FormProps) {
  const [input, setInput] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCity(input); // Send city to parent
    setInput(''); // Clear the form
  };

  return (
    <form id='form' className='flex' onSubmit={handleSubmit}>
      <input
        required
        type='text'
        name='city'
        placeholder='City'
        className='p-3 w-full'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type='submit' className='px-4 py-2 bg-blue-600'>
        OK
      </button>
    </form>
  );
}
