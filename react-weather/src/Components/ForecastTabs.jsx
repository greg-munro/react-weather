import { Tabs, TabList, Tab } from '@chakra-ui/react';

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

export default ForecastTabs;
