import { useState, useEffect } from 'react';
import axios from 'axios';
import RainfallChart from './RainfallChart';
import LocationInputForm from './LocationInputForm';
import CurrentWeather from './CurrentWeather';
import ForecastTabs from './ForecastTabs';
import WindChart from './WindChart';
import { Switch, Stack } from '@chakra-ui/react';
import Clouds from './Clouds';
import DailyHourlySelector from './DailyHourlySelector';


const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [dailyView, setDailyView] = useState(true);
  const [hourlyView, setHourlyView] = useState(false);
  const [showRainfall, setShowRainfall] = useState(false);
  const [showConditions, setShowConditions] = useState(true);
  const [showHourlyRain, setShowHourlyRain] = useState(false);
  const [showWind, setShowWind] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);
  const [error, setError] = useState(null);


  const API_KEY = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;

  const handleSubmit = () => {
    const userSearch = document.querySelector('input').value;
    const formGroup = document.querySelector('.form__group');
    if (userSearch.length > 0) {
      setLocation(userSearch);
      formGroup.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30">
      <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
      </svg>`
    }
    setError(null);
  };

  const handleReturn = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleConditionsClick = () => {
    setShowConditions(true);
    setShowRainfall(false);
    setShowWind(false);
  };

  const handleDailyClick = () => {
    setDailyView(true);
    setHourlyView(false);
    setShowRainfall(false);
  };

  const handleHourlyClick = () => {
    setHourlyView(true);
    setDailyView(false);
    setShowRainfall(false);
  };

  const handleRainfallClick = () => {
    setShowRainfall(true);
    setShowConditions(false);
    setShowWind(false);
  };

  const handleWindClick = () => {
    setShowWind(true);
    setShowConditions(false);
    setShowRainfall(false);
  };

  const handleMetricClick = () => {
    setIsCelsius((prev) => !prev);
  };

  const handleHourlyRainClick = () => {
    setShowHourlyRain(true);
  };

  useEffect(() => {
    if (location !== '') {
      axios
        .get(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7`
        )
        .then((response) => {
          console.log('weatherData:', response.data);
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
          setWeatherData(null); // Clear previous data in case of an error
          setError('Location not found. Please enter a valid location.');
        });
    }
  }, [location]);

  return (
    <>
      <Clouds />
      <LocationInputForm
        handleSubmit={handleSubmit}
        handleReturn={handleReturn}
        weatherData={weatherData}
      />
      {weatherData && (
        <div className='weather-body'>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <CurrentWeather
            weatherData={weatherData}
            location={location}
            isCelsius={isCelsius}
          />

          {weatherData && (
            <>
            <div className='forecast-selector'>

            <DailyHourlySelector
                  handleDailyClick={handleDailyClick}
                  handleHourlyClick={handleHourlyClick}
                  dailyView={dailyView}
                />

              <Stack align='center' direction='row'>
                <span>C°</span>
                <Switch size='md' onChange={handleMetricClick} />
                <span>F°</span>
              </Stack>

              </div>
            </>
          )}

          {weatherData && dailyView && (
            <>
              <ForecastTabs
                handleConditionsClick={handleConditionsClick}
                handleRainfallClick={handleRainfallClick}
                handleWindClick={handleWindClick}
              />
              {showRainfall && <RainfallChart weatherData={weatherData} />}
              {showWind && <WindChart weatherData={weatherData} />}
              {weatherData.forecast &&
                weatherData.forecast.forecastday &&
                showConditions && (
                  <div className='forecast-days-container'>
                    {showRainfall && (
                      <div className='rainfall-container'>
                        <div id='rainfallChart'></div>
                      </div>
                    )}
                    {weatherData.forecast.forecastday.map((day) => {
                      const dateObject = new Date(day.date)
                      const dayOfWeek = dateObject.toLocaleDateString('en-US', {
                        weekday: 'short',
                      })
                      const dayOfMonth = dateObject.getDate()

                      return (
                        <div className='daily-weather' key={day.date}>
                          <ul>
                            <li>
                              {`${dayOfWeek} ${dayOfMonth}`}
                              <img src={day.day.condition.icon} alt='icon' />
                              <div className='min-max-temps'>
                                <span className='min-temp'>
                                  {isCelsius
                                    ? `${day.day.mintemp_c}°C`
                                    : `${day.day.mintemp_f}°F`}
                                </span>
                                <span className='max-temp'>
                                  {isCelsius
                                    ? `${day.day.maxtemp_c}°C`
                                    : `${day.day.maxtemp_f}°F`}
                                </span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      )
                    })}
                  </div>
                )}
            </>
          )}

          {weatherData && hourlyView && (
            <>
              <ForecastTabs
                handleConditionsClick={handleConditionsClick}
                handleRainfallClick={handleHourlyRainClick}
                handleWindClick={handleWindClick}
              />
              <ul className='hourly-container'>
                {weatherData.forecast &&
                  weatherData.forecast.forecastday.map((day, index) => {
                    if (index === 0) {
                      const currentTime = new Date()
                      return day.hour.map((eachHour, index) => {
                        const hourTime = new Date(eachHour.time)
                        // Show only upcoming hours
                        if (hourTime > currentTime) {
                          const hourOnly = eachHour.time
                            .split(' ')[1]
                            .slice(0, 5)
                          return (
                            <div className='hour-block' key={index}>
                              <li>{hourOnly}</li>
                              <img src={eachHour.condition.icon} alt='icon' />
                              <span>
                                {isCelsius
                                  ? `${eachHour.temp_c}°C`
                                  : `${eachHour.temp_f}°F`}
                              </span>
                            </div>
                          )
                        }
                        // Return null for hours that have already passed
                        return null
                      })
                    }
                    // Return null for days other than the first day
                    return null
                  })}
              </ul>
            </>
          )}
          {weatherData && hourlyView && showHourlyRain ? (
            <div className='test'>
              Content to render when showHourlyRain is true
            </div>
          ) : null}
        </div>
      )}
    </>
  )
};

export default Weather;
