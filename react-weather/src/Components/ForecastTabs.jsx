import { Tabs, TabList, Tab } from '@chakra-ui/react';
import PropTypes from 'prop-types'

const ForecastTabs = ({ handleConditionsClick, handleRainfallClick, handleWindClick }) => {
  return (
    <Tabs>
      <TabList>
        <Tab onClick={handleConditionsClick}>Conditions</Tab>
        <Tab onClick={handleRainfallClick}>Precipitation</Tab>
        <Tab onClick={handleWindClick}>Wind</Tab>
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
