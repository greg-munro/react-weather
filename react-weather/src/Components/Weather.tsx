import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Weather = () => {
  const [location, setLocation] = useState('');
  const API_KEY = '237c55e13ccd467290e170801231411'

  const handleSubmit = () => {
    const userSearch = (document.querySelector('input') as HTMLInputElement).value
    setLocation(userSearch || '')
  };

  axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`)
  .then(weatherData => console.log('data:', weatherData))


  return (
    <div className='main-search-box'>
      <input
        type='text'
        placeholder='Enter location...'
      />
      <button onClick={handleSubmit}>Submit</button>
      <h3>The weather in {location}</h3>
    </div>
  );
};

export default Weather;
