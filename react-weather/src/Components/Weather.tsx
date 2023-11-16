import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = '237c55e13ccd467290e170801231411';

  const handleSubmit = () => {
    const userSearch = (document.querySelector('input') as HTMLInputElement).value;
    setLocation(userSearch || '');
  };

  useEffect(() => {
    if (location !== '') {
      axios
        .get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&aqi=no`)
        .then((response) => {
          console.log('data:', response.data);
          setWeatherData(response.data);
        })
        .catch((error) => console.error('Error fetching weather data:', error));
    }
  }, [location]);

  return (
    <div className='main-search-box'>
      <input type='text' placeholder='Enter location...' />
      <button onClick={handleSubmit}>Submit</button>
      {weatherData && <p>The weather in {location.charAt(0).toUpperCase() + location.slice(1)}, {weatherData?.location.country}</p>}
      {weatherData && (
        <div>
          <p>{weatherData.current.temp_c}°C - {weatherData.current.condition.text}</p>
          <img src={weatherData.current.condition.icon} className="weather-icon" />
        </div>
      )}
    </div>
  );
};

export default Weather;
