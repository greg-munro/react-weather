import React, { useEffect, useState } from 'react'

const Forecast = () => {
  const [forecast, setForecast] = useState(null)
  const API_KEY = '237c55e13ccd467290e170801231411';

  useEffect(() => {
      axios
        .get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&aqi=no`)
        .then((response) => {
          console.log('data:', response.data);
          setWeatherData(response.data);
        })
        .catch((error) => console.error('Error fetching weather data:', error));
  }, [location]);
  return (
    <div>Forecast</div>
  )
}

export default Forecast