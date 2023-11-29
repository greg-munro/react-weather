import { IconButton } from '@chakra-ui/react'
import { ArrowForwardIcon, Search2Icon } from '@chakra-ui/icons'
import PropTypes from 'prop-types'

const LocationInputForm = ({ handleSubmit, handleReturn, weatherData }) => {
  const searchClass = 'form__group field small'
  const formClass = 'form__group field'

  const handleSearchIconClick = () => {
    console.log('Hello m8')
  };

  return (
    // prev class was 'form__group field'
    <div className={weatherData ? 'form__group_searched' : 'form__group field' }>
      <input
        type='input'
        className='form__field'
        placeholder='Enter location...'
        id='name'
        onKeyDown={handleReturn}
        autoComplete='off'
      />
      <label htmlFor='name' className='form__label'>
        Search location, city...
      </label>
      <IconButton
        isRound={true}
        variant='solid'
        colorScheme='blue'
        aria-label='Done'
        fontSize='20px'
        icon={weatherData ? <Search2Icon /> : <ArrowForwardIcon />}
        onClick={() => {
          handleSubmit();
          if (weatherData) {
            handleSearchIconClick();
          }
        }}
      />
    </div>
  )
}

LocationInputForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleReturn: PropTypes.func.isRequired,
}

export default LocationInputForm
