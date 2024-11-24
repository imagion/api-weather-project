'use client';

import { useWeather } from '@/app/hooks/useWeather';
import { cn } from '@/app/lib/utils';
import Image from 'next/image';

export default function Card({ city }: { city: string }) {
  const { cityDetails, cityWeather, loading, error } = useWeather(city);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      id='card'
      className={cn(
        'flex-col items-center bg-white mt-3 relative',
        cityDetails ? 'flex' : 'hidden'
      )}>
      <Image
        src={cityWeather?.IsDayTime ? '/day.svg' : '/night.svg'}
        width={400}
        height={400}
        alt='Card Image'
      />
      <div className='relative w-24 top-[-3rem] mb-[-3rem] bg-neutral-200 rounded-full'>
        <Image
          src={`/icons/${cityWeather?.WeatherIcon}.svg`}
          width={100}
          height={100}
          alt='Card Icon'
        />
      </div>
      <div
        id='details'
        className='uppercase text-center text-neutral-500 [&>*+*]:mt-2 p-2'>
        <h5>{cityDetails?.LocalizedName}</h5>
        <div>{cityWeather?.WeatherText}</div>
        <div className='text-2xl'>
          <span>{cityWeather?.Temperature.Metric.Value}</span>
          <span>&deg;C</span>
        </div>
      </div>
    </div>
  );
}
