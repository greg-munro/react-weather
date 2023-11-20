import { useEffect } from 'react';
import * as echarts from 'echarts';
import PropTypes from 'prop-types'

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
        title: {
          text: 'Expected rainfall (mm)'
        },
        color: ['#2e7fc7'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxis,
        },
        yAxis: {
          type: 'value',
        },
        tooltip: {
          trigger: 'axis', // Display tooltip when hovering over the series
          axisPointer: {
            type: 'cross', // Display a crosshair
          },
        },
        series: [
          {
            data: yAxis,
            type: 'line',
            areaStyle: {},
            smooth: true
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

RainfallChart.propTypes = {
  weatherData: PropTypes.func.isRequired,
};

export default RainfallChart;
