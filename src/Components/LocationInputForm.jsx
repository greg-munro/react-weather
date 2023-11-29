import { useState } from 'react';
import { IconButton } from '@chakra-ui/react';
import { ArrowForwardIcon, Search2Icon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import '../App.css'

const LocationInputForm = ({ handleSubmit, handleReturn, weatherData }) => {
  const [searchBarStatus, setSearchBarStatus] = useState(true);

  const handleSearchIconClick = () => {
    setSearchBarStatus((prev) => !prev);
  };

  const formClassName = `form__group_${searchBarStatus ? 'searched' : 'renewed'}`;

  return (
    <div className={weatherData ? formClassName : 'form__group field'}>
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
  );
};

LocationInputForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleReturn: PropTypes.func.isRequired,
};

export default LocationInputForm;
