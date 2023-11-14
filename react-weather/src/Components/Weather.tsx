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
        .get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`)
        .then((response) => {
          console.log('data:', response.data);
          setWeatherData(response.data);
        })
        .catch((error) => console.error('Error fetching weather data:', error));
    }
  }, [location]);

  let weatherIcon
  if (weatherData?.current.condition.text === 'Partly cloudy' || 'Overcast') {
    weatherIcon = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Weather-overcast.svg/800px-Weather-overcast.svg.png'
  }
  else if (weatherData?.current.condition.text === 'Clear' ||  'Sunny') {
    weatherIcon = 'https://static-00.iconduck.com/assets.00/weather-clear-symbolic-icon-2048x2048-v4afvu7m.png'
  }

  return (
    <div className='main-search-box'>
      <input type='text' placeholder='Enter location...' />
      <button onClick={handleSubmit}>Submit</button>
      <p>The weather in {location.charAt(0).toUpperCase() + location.slice(1)}, {weatherData?.location.country}</p>
      {weatherData && (
        <div>
          <p>{weatherData.current.temp_c}°C {weatherData.current.condition.text}</p>
          <img src={weatherIcon} className="weather-icon" />
        </div>
      )}
    </div>
  );
};

export default Weather;
