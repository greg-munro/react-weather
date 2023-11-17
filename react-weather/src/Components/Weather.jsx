import { useState, useEffect } from 'react'
import axios from 'axios'
import RainfallChart from './RainfallChart'
import LocationInputForm from './LocationInputForm'
import CurrentWeather from './CurrentWeather'
import ForecastTabs from './ForecastTabs'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'; 
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

const Weather = () => {
  const [location, setLocation] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [dailyView, setDailyView] = useState(true)
  const [hourlyView, setHourlyView] = useState(false)
  const [showRainfall, setShowRainfall] = useState(false)
  const [showConditions, setShowConditions] = useState(true);

  const API_KEY = '237c55e13ccd467290e170801231411'

  const handleSubmit = () => {
    const userSearch = document.querySelector('input').value
    if (userSearch.length > 0) {
      setLocation(userSearch)
    }
  }
  const handleReturn = (event) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }
  const handleConditionsClick = () => {
    setShowConditions(true)
    setShowRainfall(false)
  }
  const handleDailyClick = () => {
    setDailyView(true)
    setHourlyView(false)
    setShowRainfall(false)
  }
  const handleHourlyClick = () => {
    setHourlyView((prevState) => !prevState)
    setDailyView(false)
  }
  const handleRainfallClick = () => {
    setShowRainfall(true)
    setShowConditions(false)

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
  }, [location, showRainfall])

  return (
    <>
      <LocationInputForm handleSubmit={handleSubmit} handleReturn={handleReturn} />
      <CurrentWeather weatherData={weatherData} location={location} />

      {weatherData && (
        <>
          <h2>Forecast</h2>
          <div>
            <Menu>
              {() => (
                <>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    {dailyView ? 'Daily' : 'Hourly'}
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => handleDailyClick('daily')}>
                      Daily
                    </MenuItem>
                    <MenuItem onClick={() => handleHourlyClick('hourly')}>
                      Hourly
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
          </div>
        </>
      )}

      {weatherData && dailyView && (
        <>
        <ForecastTabs
            handleConditionsClick={handleConditionsClick}
            handleRainfallClick={handleRainfallClick}
          />
          {showRainfall && <RainfallChart weatherData={weatherData} />}
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

      {weatherData && hourlyView && (
        <div>
          <ul className='hourly-container'>
            {weatherData.forecast &&
              weatherData.forecast.forecastday.map((day, index) => {
                if (index === 0) {
                  const currentTime = new Date();
                  return day.hour.map((eachHour, index) => {
                    const hourTime = new Date(eachHour.time);
                    // Show only upcoming hours
                    if (hourTime > currentTime) {
                      const hourOnly = eachHour.time.split(' ')[1].slice(0, 5);
                      return (
                        <div className='hour-block' key={index}>
                          <li>{hourOnly}</li>
                          <img src={eachHour.condition.icon} alt='icon' />
                          <span>{eachHour.temp_c} °C</span>
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
          </ul>
        </div>
      )}

    </>
  )
}

export default Weather
