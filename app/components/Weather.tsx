'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useWeather } from '@/app/hooks/useWeather';
import { cn } from '@/app/lib/utils';
import getConfig from 'next/config';

export default function Weather() {
  const [inputValue, setInputValue] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { cityDetails, cityWeather, error } = useWeather(city);
  const { publicRuntimeConfig } = getConfig();
  const basePath = publicRuntimeConfig.basePath;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCity(inputValue);

    localStorage.setItem('city', inputValue);

    setInputValue('');
  };

  // Load city from localStorage on component mount
  useEffect(() => {
    const savedCity = localStorage.getItem('city');
    if (savedCity) {
      setCity(savedCity);
    }
  }, []);

  // Focus the input field when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <h1 className='text-2xl text-neutral-600 text-center'>Погода</h1>
      <form className='flex' onSubmit={handleSubmit}>
        <input
          required
          type='text'
          placeholder='Город'
          className='p-3 w-full'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type='submit' className='px-4 py-2 bg-blue-600'>
          OK
        </button>
      </form>
      {error && <div className='text-red-500'>{error}</div>}
      {cityDetails && cityWeather && (
        <div
          className={cn(
            'flex-col items-center bg-white mt-3 relative',
            cityDetails ? 'flex' : 'hidden'
          )}>
          <Image
            src={
              cityWeather.IsDayTime
                ? `${basePath}/day.svg`
                : `${basePath}/night.svg`
            }
            width={400}
            height={400}
            alt='Day or Night'
          />
          <div className='relative w-24 top-[-3rem] mb-[-3rem] bg-neutral-200 rounded-full'>
            <Image
              src={`${basePath}/icons/${cityWeather.WeatherIcon}.svg`}
              width={100}
              height={100}
              alt='Weather Icon'
            />
          </div>
          <div className='uppercase text-center text-neutral-500 [&>*+*]:mt-2 p-2'>
            <h5>{cityDetails.LocalizedName}</h5>
            <div>{cityWeather.WeatherText}</div>
            <div className='text-2xl'>
              <span>{cityWeather.Temperature.Metric.Value}</span>
              <span>&deg;C</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
