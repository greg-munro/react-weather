import { useEffect } from 'react'
import * as echarts from 'echarts'
import PropTypes from 'prop-types'

const WindChart = ({ weatherData }) => {
  const xAxis = [];
  const yAxis = [];
  useEffect(() => {
  
    if (weatherData) {
      weatherData.forecast.forecastday.forEach((day) => {
        const dateObject = new Date(day.date);
        const dayOfWeek = dateObject.toLocaleDateString('en-US', {
          weekday: 'short',
        });
        xAxis.push(dayOfWeek);
        yAxis.push(day.day.maxwind_mph);
      })

      const windChart = echarts.init(document.getElementById('windChart'))
      const option = {
        title: {
          text: 'Maximum windspeeds (mph)'
        },
        toolbox: {
          feature: {
            dataView: {},
            saveAsImage: {
              pixelRatio: 2
            }
          }
        },
        xAxis: {
          type: 'category',
          data: xAxis
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis', // Display tooltip when hovering over the series
          axisPointer: {
            type: 'cross', // Display a crosshair
          },
          formatter: function (params) {
            // Display tooltip with "mph" after the value
            return `${params[0].name}: ${params[0].value}mph`;
          },
        },
        series: [
          {
            data: yAxis,
            type: 'line',
            animationDelay: function (idx) {
              return idx * 10;
            }
          }
        ]
      };
      windChart.setOption(option)
      return () => {
        windChart.dispose();
      };
    }
  }, [weatherData])



  return <div id='windChart'></div>;
}

WindChart.propTypes = {
  weatherData: PropTypes.object.isRequired,
}

export default WindChart
