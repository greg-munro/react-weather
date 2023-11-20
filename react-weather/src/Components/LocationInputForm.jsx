import { IconButton } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import PropTypes from 'prop-types'

const LocationInputForm = ({ handleSubmit, handleReturn }) => {
  return (
    <div className='form__group field'>
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
        icon={<ArrowForwardIcon />}
        onClick={handleSubmit}
      />
    </div>
  )
}

LocationInputForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleReturn: PropTypes.func.isRequired,
}

export default LocationInputForm
