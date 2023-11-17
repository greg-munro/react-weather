import { useState, useEffect } from 'react';
import axios from 'axios';
import RainfallChart from './RainfallChart';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [dailyView, setDailyView] = useState(true);
  const [hourlyView, setHourlyView] = useState(false);
  const [showRainfall, setShowRainfall] = useState(false);

  const API_KEY = '237c55e13ccd467290e170801231411';

  const handleSubmit = () => {
    const userSearch = document.querySelector('input').value;
    if (userSearch.length > 0) {
      setLocation(userSearch);
    }
  };
  const handleReturn = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };
  const handleDailyClick = () => {
    setDailyView((prevState) => !prevState);
    setHourlyView(false);
  };
  const handleHourlyClick = () => {
    setHourlyView((prevState) => !prevState);
    setDailyView(false);
  };
  const handleRainfallClick = () => {
    setShowRainfall((prevState) => !prevState);
    hideDailyView()
  };

  function hideDailyView() {
    let dailyDiv = document.querySelector(".forecast-days-container");
    dailyDiv.style.display = 'none'
  }

  useEffect(() => {
    if (location !== '') {
      axios
        .get(
          `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7`
        )
        .then((response) => {
          console.log('weatherData:', response.data);
          setWeatherData(response.data);
        })
        .catch((error) => console.error('Error fetching weather data:', error));
    }
  }, [location, showRainfall]);

  return (
    <>
      <input
        type='text'
        placeholder='Enter location...'
        onKeyDown={handleReturn}
      />
      <button onClick={handleSubmit}>Submit</button>
      {weatherData && (
        <p>
          The weather in {location.charAt(0).toUpperCase() + location.slice(1)},{' '}
          {weatherData.location.region}
        </p>
      )}
      {weatherData && (
        <div className='current-weather-container'>
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
      {weatherData && (
        <>
          <h2>Forecast</h2>
          <div>
            <button onClick={handleDailyClick}>Daily</button>
            <button onClick={handleHourlyClick}>Hourly</button>
          </div>
        </>
      )}

      {weatherData && dailyView && (
        <>
          <h4>Next 7 days</h4>
          <button onClick={handleRainfallClick}>Precipitation</button>
          <button>Wind</button>
          {showRainfall && <RainfallChart weatherData={weatherData} />}
          {weatherData.forecast &&
            weatherData.forecast.forecastday && (
              <div className='forecast-days-container'>
                {showRainfall && (
                  <div className='rainfall-container'>
                    <div id='rainfallChart'></div>
                  </div>
                )}
                {weatherData.forecast.forecastday.map((day) => {
                  const dateObject = new Date(day.date);
                  const dayOfWeek = dateObject.toLocaleDateString('en-US', {
                    weekday: 'short',
                  });
                  const dayOfMonth = dateObject.getDate();

                  return (
                    <div className='daily-weather' key={day.date}>
                      <ul>
                        <li>
                          {`${dayOfWeek} ${dayOfMonth}`}
                          <img src={day.day.condition.icon} alt='icon' />
                          <span>{day.day.avgtemp_c}°C</span>
                        </li>
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
        </>
      )}

      {weatherData && hourlyView && (
        <div>
          <h4>24 hours</h4>
          <ul className='hourly-container'>
            {weatherData.forecast &&
              weatherData.forecast.forecastday.map((day, index) => {
                if (index === 0) {
                  return day.hour.map((eachHour, index) => {
                    const hourOnly = eachHour.time.split(' ')[1].slice(0, 5);
                    return (
                      <div className='hour-block' key={eachHour[index]}>
                        <li>{hourOnly}</li>
                        <img src={eachHour.condition.icon} />
                        <span>{eachHour.temp_c} °C</span>
                      </div>
                    );
                  });
                }
              })}
          </ul>
        </div>
      )}
    </>
  );
};

export default Weather;
