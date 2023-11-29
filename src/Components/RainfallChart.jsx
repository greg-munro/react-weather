import { useEffect } from 'react';
import * as echarts from 'echarts';
import PropTypes from 'prop-types';

const RainfallChart = ({ weatherData }) => {
  useEffect(() => {
    // Check if weatherData is available
    if (weatherData) {
      const xAxis = []
      const yAxis = []
      weatherData.forecast.forecastday.forEach((day) => {
        const dateObject = new Date(day.date);
        const dayOfWeek = dateObject.toLocaleDateString('en-US', {
          weekday: 'short',
        });
        xAxis.push(dayOfWeek);
        yAxis.push(day.day.totalprecip_mm);
      });
      console.log('x:', xAxis, 'y:', yAxis);

      // Initialize ECharts and set options
      const rainChart = echarts.init(document.getElementById('rainfallChart'));
      const option = {
        title: {
          text: 'Expected rainfall',
          textStyle: {
            color: 'white', // Change the font color here
          },
        },

        color: ['#2e7fc7'],
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxis,
          name: 'Day',
          nameTextStyle: {
            color: 'white',
          },
          axisLabel: {
            color: 'white',
          },
        },
        yAxis: {
          type: 'value',
          name: 'Milimeters',
          nameTextStyle: {
            color: 'white',
          },
          axisLabel: {
            color: 'white',
          },
        },
        tooltip: {
          trigger: 'axis', // Display tooltip when hovering over the series
          axisPointer: {
            type: 'cross', // Display a crosshair
          },
          formatter: function (params) {
            // Display tooltip with "mm" after the value
            return `${params[0].name}: ${(params[0].value)}mm`;
          },
        },
        series: [
          {
            data: yAxis,
            type: 'line',
            lineStyle: {
              color: 'pink',
            },
            areaStyle: {},
            smooth: true,
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
  weatherData: PropTypes.object.isRequired,
};

export default RainfallChart;
