import { Tabs, TabList, Tab } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const ForecastTabs = ({ handleConditionsClick, handleRainfallClick, handleWindClick }) => {
  return (
    <Tabs colorScheme="blue"> {/* Use the 'unstyled' variant to provide custom styling */}
      <TabList>
        <Tab
          onClick={handleConditionsClick}
          _selected={{ color: 'white', bg: 'gray.400', borderBottomWidth: '2px', borderTopRadius: '8px' }}
        >
          Conditions
        </Tab>
        <Tab
          onClick={handleRainfallClick}
          _selected={{ color: 'white', bg: 'gray.400', borderBottomWidth: '2px', borderTopRadius: '8px' }}
        >
          Precipitation
        </Tab>
        <Tab
          onClick={handleWindClick}
          _selected={{ color: 'white', bg: 'gray.400', borderBottomWidth: '2px', borderTopRadius: '8px' }}
        >
          Wind
        </Tab>
      </TabList>
    </Tabs>
  );
};

ForecastTabs.propTypes = {
  handleConditionsClick: PropTypes.func.isRequired,
  handleRainfallClick: PropTypes.func.isRequired,
  handleWindClick: PropTypes.func.isRequired,
};

export default ForecastTabs;
