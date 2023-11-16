import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = () => {
  const [location, setLocation] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [viewMode, setViewMode] = useState('daily') // Default view mode is 'daily'
  const API_KEY = '237c55e13ccd467290e170801231411'

  const handleSubmit = () => {
    const userSearch = document.querySelector('input').value
    setLocation(userSearch || '')
  }

  const handleDailyClick = () => {
    setViewMode('daily')
  }

  const handleHourlyClick = () => {
    setViewMode('hourly')
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
        <div className="current-weather-container">
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

      <h2>Forecast</h2>
      <div>
        <button onClick={handleDailyClick}>Daily</button>
        <button onClick={handleHourlyClick}>Hourly</button>
      </div>

      <div>
        {viewMode === 'daily' && (
          <>
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
                      <div className='' key={day.date}>
                        <ul>
                          <li>
                            {`${dayOfWeek} ${dayOfMonth}`}
                            <img src={day.day.condition.icon} alt='icon' />
                            <span>{day.day.avgtemp_c}°C</span>
                          </li>
                        </ul>
                      </div>
                    )
                  })}
                </div>
              )}
          </>
        )}

        {viewMode === 'hourly' && (
          <div>
          <h4>24 hours</h4>
            <ul className='hourly-container'>
              {weatherData &&
                weatherData.forecast.forecastday.map((day, index) => {
                  if (index === 0) {
                    return day.hour.map((eachHour, index) => {
                      const hourOnly = eachHour.time.split(' ')[1].slice(0, 5)
                      return (
                        <div className="hour-block" key={eachHour[index]}>
                          <li>{hourOnly}</li>
                          <img src={eachHour.condition.icon}/>
                          <span>{eachHour.temp_c} °C</span>
                          </div>
                      ) 
                      })
                  }
                })}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default Weather
