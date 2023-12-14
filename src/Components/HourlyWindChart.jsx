import { useEffect } from 'react';
import * as echarts from 'echarts';
import PropTypes from 'prop-types';

const HourlyWindChart = ({ weatherData }) => {
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

      const yAxis = filteredHours.map((eachHour) => eachHour.wind_mph);


      // Initialize ECharts and set options
      const rainChart = echarts.init(document.getElementById('hourlyWindChart'));
      const option = {
        title: {
          text: 'Maximum windspeeds',
          textStyle: {
            color: 'white',
          },
        },
        toolbox: {
          feature: {
            dataView: {
             show: true,
            },
            saveAsImage: {
              pixelRatio: 4,
            },
          },
        },
        xAxis: {
          type: 'category',
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
          name: 'Mph',
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
            return `${params[0].name}: ${(params[0].value)}mph`;
          },
        },
        series: [
          {
            data: yAxis,
            type: 'line',
            animationDelay: function (idx) {
              return idx * 10;
            },
            lineStyle: {
              color: 'orange',
            },
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

  return <div id='hourlyWindChart'></div>;
};

HourlyWindChart.propTypes = {
  weatherData: PropTypes.object.isRequired,
};

export default HourlyWindChart
