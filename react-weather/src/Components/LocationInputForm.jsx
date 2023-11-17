import { IconButton } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons';

const LocationInputForm = ({ handleSubmit, handleReturn }) => {
  return (
    <div className="form__group field">
      <input
        type="input"
        className="form__field"
        placeholder="Enter location..."
        id="name"
        onKeyDown={handleReturn}
        
      />
      <label htmlFor="name" className="form__label">
        Enter location...
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
      {/* <button >Submit</button> */}

    </div>
  );
};

export default LocationInputForm;
