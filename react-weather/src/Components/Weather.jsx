import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const API_key = 'dba0838d8e60d5b708f95b93cf29fbd5'; // Replace with your actual API key
  const lat = 39.099724; // Replace with the desired latitude
  const lon = -94.578331; // Replace with the desired longitude
  // const date = '16'; // Replace with the desired date
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`)
      .then((response) => {
        console.log('response', response.data);
        setWeatherData(response.data)
      })
      .catch((error) => {
        console.error('ERROR 🤦🏽‍♂️', error.message);
      });
  }, [API_key, lat, lon]);

  return (
    <div>
      <h1>{weatherData.name}</h1>
      <h4>{weatherData.weather[0].description}</h4>
    </div>
  );
};

export default Weather;
