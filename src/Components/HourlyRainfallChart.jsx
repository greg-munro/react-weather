import { useEffect } from 'react';
import * as echarts from 'echarts';
import PropTypes from 'prop-types';

const HourlyRainfallChart = ({ weatherData }) => {
  useEffect(() => {
    if (weatherData) {
      const firstDay = weatherData.forecast.forecastday[0];
      
      // Filter out past hours
      const currentDate = new Date();
      const currentHour = currentDate.getHours();
      const filteredHours = firstDay.hour.filter((eachHour) => {
        const hour = new Date(eachHour.time).getHours();
        return hour >= currentHour;
      });

      const xAxis = filteredHours.map((eachHour) => {
        const dateObject = new Date(eachHour.time);
        const formattedTime = dateObject.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        });
        return formattedTime;
      });

      const yAxis = filteredHours.map((eachHour) => eachHour.precip_mm);


      // Initialize ECharts and set options
      const rainChart = echarts.init(document.getElementById('hourlyRainfallChart'));
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
          name: 'Hour',
          nameTextStyle: {
            color: 'white',
          },
          axisLabel: {
            color: 'white',
            rotate: 10,
            margin: 15,
            formatter: function (value, index) {
              // Show labels only for every 3rd index
              if (index === 0) {
                return ''
              }
              if (index % 3 === 0) {
                return value;
              } 
              else {
                return '';
              }
            },
          },
        },
        yAxis: {
          type: 'value',
          name: 'Millimeters',
          nameTextStyle: {
            color: 'white',
          },
          axisLabel: {
            color: 'white',
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
          formatter: function (params) {
            return `${params[0].name}: ${params[0].value}mm`;
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

  return <div id='hourlyRainfallChart'></div>;
};

HourlyRainfallChart.propTypes = {
  weatherData: PropTypes.object.isRequired,
};

export default HourlyRainfallChart;
