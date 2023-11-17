import { useEffect } from 'react';
import * as echarts from 'echarts';

const RainfallChart = ({ weatherData }) => {
  const xAxis = [];
  const yAxis = [];

  useEffect(() => {
    // Check if weatherData is available
    if (weatherData) {
      // Iterate over forecastday and push data to xAxis and yAxis
      weatherData.forecast.forecastday.forEach((day) => {
        const dateObject = new Date(day.date);
        const dayOfWeek = dateObject.toLocaleDateString('en-US', {
          weekday: 'short',
        });
        xAxis.push(dayOfWeek);
        yAxis.push(day.day.totalprecip_mm);
      });

      // Initialize ECharts and set options
      const rainChart = echarts.init(document.getElementById('rainfallChart'));
      const option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxis,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: yAxis,
            type: 'line',
            areaStyle: {},
          },
        ],
      };
      rainChart.setOption(option);

      // Cleanup ECharts instance when the component unmounts
      return () => {
        rainChart.dispose();
      };
    }
  }, [weatherData]);

  return <div id='rainfallChart'></div>;
};

export default RainfallChart;
