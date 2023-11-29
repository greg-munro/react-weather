import { useEffect } from 'react';
import * as echarts from 'echarts';
import PropTypes from 'prop-types';


const WindChart = ({ weatherData }) => {
  useEffect(() => {
    if (weatherData) {
      const xAxis = [];
      const yAxis = [];
      weatherData.forecast.forecastday.forEach((day) => {
        const dateObject = new Date(day.date);
        const dayOfWeek = dateObject.toLocaleDateString('en-US', {
          weekday: 'short',
        });
        xAxis.push(dayOfWeek);
        yAxis.push(day.day.maxwind_mph);
      });

      const windChart = echarts.init(document.getElementById('windChart'), null, {
        renderer: 'canvas',
        width: 'auto',
        height: 'auto',
      });

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

      windChart.setOption(option);

      return () => {
        windChart.dispose();
      };
    }
  }, [weatherData]);

  return <div id='windChart'></div>;
};

WindChart.propTypes = {
  weatherData: PropTypes.object.isRequired,
};

export default WindChart;
