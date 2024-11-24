'use client';

import { useState, useEffect } from 'react';

interface CityDetails {
  Key: string;
  LocalizedName: string;
}

interface CityWeather {
  WeatherText: string;
  IsDayTime: boolean;
  WeatherIcon: string;
  Temperature: {
    Metric: {
      Value: number;
    };
  };
}

const KEY = process.env.NEXT_PUBLIC_WEATHER_API;

export const useWeather = (city: string) => {
  const [cityDetails, setCityDetails] = useState<CityDetails | null>(null);
  const [cityWeather, setCityWeather] = useState<CityWeather | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!city) {
        return; // Exit early if city is an empty string
      }

      try {
        setError(null);

        const getCity = async (city: string): Promise<CityDetails> => {
          const base =
            'http://dataservice.accuweather.com/locations/v1/cities/search';
          const query = `?apikey=${KEY}&q=${city}&language=${'ru-ru'}`;
          const res = await fetch(base + query);
          const data = await res.json();
          return data[0];
        };

        const getWeather = async (id: string): Promise<CityWeather> => {
          const base =
            'http://dataservice.accuweather.com/currentconditions/v1/';
          const query = `${id}?apikey=${KEY}&language=${'ru-ru'}`;
          const res = await fetch(base + query);
          const data = await res.json();
          return data[0];
        };

        const cityDetails = await getCity(city);
        const cityWeather = await getWeather(cityDetails.Key);

        setCityDetails(cityDetails);
        setCityWeather(cityWeather);
      } catch (err) {
        console.error(err);
        setError('Не удалось получить данные о погоде.');
      }
    };

    fetchWeatherData();
  }, [city]);

  return { cityDetails, cityWeather, error };
};
