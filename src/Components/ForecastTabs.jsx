import { Tabs, TabList, Tab } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const ForecastTabs = ({ handleConditionsClick, handleRainfallClick, handleWindClick }) => {
  return (
    <Tabs> {}
      <TabList >
        <Tab
          onClick={handleConditionsClick}
          _selected={{ color: 'white', bg: 'gray.400', borderBottomWidth: '2px', borderTopRadius: '8px' }}
          _hover={{ bg: 'blue.600', color: 'white', borderBottomWidth: '2px', borderTopRadius: '8px' }}
        >
          Conditions
        </Tab>
        <Tab
          onClick={handleRainfallClick}
          _selected={{ color: 'white', bg: 'gray.400', borderBottomWidth: '2px', borderTopRadius: '8px' }}
          _hover={{ bg: 'blue.600', color: 'white', borderBottomWidth: '2px', borderTopRadius: '8px' }}
        >
          Precipitation
        </Tab>
        <Tab
          onClick={handleWindClick}
          _selected={{ color: 'white', bg: 'gray.400', borderBottomWidth: '2px', borderTopRadius: '8px' }}
          _hover={{ bg: 'blue.600', color: 'white', borderBottomWidth: '2px', borderTopRadius: '8px' }}
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
