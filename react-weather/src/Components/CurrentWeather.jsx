import { Switch, Stack } from '@chakra-ui/react'
const CurrentWeather = ({ weatherData, location, isCelsius }) => {
  return (
    <div>
      {weatherData && (
        <p className='current-weather-location'>
          {location.charAt(0).toUpperCase() + location.slice(1)},{' '}
          {weatherData.location.region}
        </p>
      )}

      {weatherData && (
        <div className='current-weather-container'>
          <p>
            {isCelsius
              ? `${weatherData.current.temp_c}°C`
              : `${weatherData.current.temp_f}°F`}{' '}
            - {weatherData.current.condition.text}
          </p>
          <img
            src={weatherData.current.condition.icon}
            className='weather-icon'
          />
        </div>
      )}
    </div>
  )
}

export default CurrentWeather
