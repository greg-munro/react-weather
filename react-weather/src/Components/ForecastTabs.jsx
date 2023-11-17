import { Tabs, TabList, Tab } from '@chakra-ui/react';

const ForecastTabs = ({ handleConditionsClick, handleRainfallClick }) => {
  return (
    <Tabs>
      <TabList>
        <Tab onClick={handleConditionsClick}>Conditions</Tab>
        <Tab onClick={handleRainfallClick}>Precipitation</Tab>
        <Tab onClick={() => console.log('wind selected')}>Wind</Tab>
      </TabList>
    </Tabs>
  );
};

export default ForecastTabs;
