import PropTypes from 'prop-types'

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
              ? `${Math.floor(weatherData.current.temp_c)}°C`
              : `${Math.floor(weatherData.current.temp_f)}°F`}{' '}
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

CurrentWeather.propTypes = {
  weatherData: PropTypes.object,
  location: PropTypes.string,
  isCelsius: PropTypes.boolean
}
export default CurrentWeather
