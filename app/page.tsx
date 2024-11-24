// 'use client';

// import Header from '@/app/components/Header';
// import Form from '@/app/components/Form';
// import Card from '@/app/components/Card';
// import { useState } from 'react';
import Weather from '@/app/components/Weather';

export default function Home() {
  // const [city, setCity] = useState('');

  return (
    <div className='w-[min(100%,25rem)] flex flex-col gap-3 bg-neutral-200 shadow-xl p-6 mt-10'>
      {/* <Header />
      <Form setCity={setCity} />
      {city && <Card city={city} />} */}
      <Weather />
    </div>
  );
}
