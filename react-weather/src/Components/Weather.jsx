import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = () => {
  const [location, setLocation] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const API_KEY = '237c55e13ccd467290e170801231411'

  const handleSubmit = () => {
    const userSearch = document.querySelector('input').value
    setLocation(userSearch || '')
  }

  useEffect(() => {
    if (location !== '') {
      axios
        .get(
          `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7`
        )
        .then((response) => {
          console.log('weatherData:', response.data)
          setWeatherData(response.data)
        })
        .catch((error) => console.error('Error fetching weather data:', error))
    }
  }, [location])

  return (
    <>
      <input type='text' placeholder='Enter location...' />
      <button onClick={handleSubmit}>Submit</button>
      {weatherData && (
        <p>
          The weather in {location.charAt(0).toUpperCase() + location.slice(1)},{' '}
          {weatherData?.location.country}
        </p>
      )}
      {weatherData && (
        <div>
          <p>
            {weatherData.current.temp_c}°C -{' '}
            {weatherData.current.condition.text}
          </p>
          <img
            src={weatherData.current.condition.icon}
            className='weather-icon'
          />
        </div>
      )}

      <div>
        <h4>Next 7 days</h4>
        {weatherData &&
          weatherData.forecast &&
          weatherData.forecast.forecastday && (
            <div className='forecast-days-container'>
              {weatherData.forecast.forecastday.map((day) => {
                const dateObject = new Date(day.date)
                const dayOfWeek = dateObject.toLocaleDateString('en-US', {
                  weekday: 'short',
                })
                const dayOfMonth = dateObject.getDate()

                return (
                  <div className=""key={day.date}>
                    <ul>
                      <li>
                        {`${dayOfWeek} ${dayOfMonth}`}
                        <img src={day.day.condition.icon} />
                        <span>{day.day.avgtemp_c}°C</span>
                      </li>
                    </ul>
                  </div>
                )
              })}
            </div>
          )}
          <p>you can put a button somewhere to switch to farenheit</p>
      </div>
    </>
  )
}

export default Weather
