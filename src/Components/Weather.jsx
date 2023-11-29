import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RainfallChart from './RainfallChart';
import LocationInputForm from './LocationInputForm';
import CurrentWeather from './CurrentWeather';
import ForecastTabs from './ForecastTabs';
import WindChart from './WindChart';
import { Switch, Stack } from '@chakra-ui/react';
import Clouds from './Clouds';
import DailyHourlySelector from './DailyHourlySelector';
import HourlyRainfallChart from './HourlyRainfallChart'
import HourlyWindChart from './HourlyWindChart'
import Loader from './Loader';
import { use } from 'echarts';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [dailyView, setDailyView] = useState(true);
  const [hourlyView, setHourlyView] = useState(false);
  const [showRainfall, setShowRainfall] = useState(false);
  const [showConditions, setShowConditions] = useState(true);
  const [showHourlyConditions, setShowHourlyConditions] = useState(true);
  const [showHourlyRain, setShowHourlyRain] = useState(false);
  const [showHourlyWind, setShowHourlyWind] = useState(false)
  const [showWind, setShowWind] = useState(false);
  const [isCelsius, setIsCelsius] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;

  const handleSubmit = () => {
    const userSearch = document.querySelector('input').value;
    if (userSearch.length > 0) {
      setLocation(userSearch);
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

  const handleHourlyConditionsClick = () => {
    setShowHourlyConditions(true);
    setShowHourlyWind(false)
    setShowHourlyRain(false);
  };
  const handleHourlyRainClick = () => {
    setShowHourlyRain(true);
    setShowHourlyWind(false)
    setShowHourlyConditions(false);
  };

  const handleHourlyWindClick = () => {
    setShowHourlyWind(true)
    setShowHourlyRain(false);
    setShowHourlyConditions(false);
  }

  useEffect(() => {
    if (location !== '') {
      setLoading(true);
      axios
        .get(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7`
        )
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
          setWeatherData(null);
          setError('Location not found. Please enter a valid location.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [location]);

  return (
    <>
        <>
          <Clouds />
          <LocationInputForm
            handleSubmit={handleSubmit}
            handleReturn={handleReturn}
            weatherData={weatherData}
          />
          {
            loading ? (
        <Loader />
      ) : 
            weatherData && (
            <div className='weather-body'>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <CurrentWeather
                weatherData={weatherData}
                location={location}
                isCelsius={isCelsius}
              />
              {weatherData && dailyView && (
                <>
                  <div className='forecast-container'>
                    <DailyHourlySelector
                      handleDailyClick={handleDailyClick}
                      handleHourlyClick={handleHourlyClick}
                      dailyView={dailyView}
                    />
                    <ForecastTabs
                      handleConditionsClick={handleConditionsClick}
                      handleRainfallClick={handleRainfallClick}
                      handleWindClick={handleWindClick}
                    />
                    <Stack align='center' direction='row'>
                      <span>C°</span>
                      <Switch size='md' onChange={handleMetricClick} />
                      <span>F°</span>
                    </Stack>
                  </div>
                  {showRainfall && 
                  <div>
                  <RainfallChart weatherData={weatherData} />
                  </div>
                  }
                  {showWind && 
                  <div>
                  <WindChart weatherData={weatherData} />
                  </div>
                  }
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
                                  <div className='min-max-temps'>
                                    <span className='min-temp'>
                                      {isCelsius
                                        ? `${Math.floor(day.day.mintemp_c)}°C`
                                        : `${Math.floor(day.day.mintemp_f)}°F`}
                                    </span>
                                    <span className='max-temp'>
                                      {isCelsius
                                        ? `${Math.floor(day.day.maxtemp_c)}°C`
                                        : `${Math.floor(day.day.maxtemp_f)}°F`}
                                    </span>
                                  </div>
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
                <>
                  <div className='forecast-container'>
                    <DailyHourlySelector
                      handleDailyClick={handleDailyClick}
                      handleHourlyClick={handleHourlyClick}
                      dailyView={dailyView}
                    />
                    <ForecastTabs
                      handleConditionsClick={handleHourlyConditionsClick}
                      handleRainfallClick={handleHourlyRainClick}
                      handleWindClick={handleHourlyWindClick}
                    />
                    <Stack align='center' direction='row'>
                      <span>C°</span>
                      <Switch size='md' onChange={handleMetricClick} />
                      <span>F°</span>
                    </Stack>
                  </div>
                 {showHourlyConditions && <ul className='hourly-container'>
                    {weatherData.forecast &&
                      weatherData.forecast.forecastday.map((day, index) => {
                        if (index === 0) {
                          const currentTime = new Date();
                          return day.hour.map((eachHour, index) => {
                            const hourTime = new Date(eachHour.time);
                            // Show only upcoming hours
                            if (hourTime > currentTime) {
                              const hourOnly = eachHour.time
                                .split(' ')[1]
                                .slice(0, 5);
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
                              );
                            }
                            // Return null for hours that have already passed
                            return null;
                          });
                        }
                        // Return null for days other than the first day
                        return null;
                      })}
                  </ul>}
                </>
              )}
              {weatherData && hourlyView && showHourlyRain ? (
                <div>
                <HourlyRainfallChart weatherData={weatherData} />
                </div>
              ) : null}
              {weatherData && hourlyView && showHourlyWind ? (
                <div>
                 <HourlyWindChart weatherData={weatherData} />
                </div>
              ) : null}
            </div>
          )}
        </>
    </>
  );
};

export default Weather;
