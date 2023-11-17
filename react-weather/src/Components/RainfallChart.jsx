import  { useEffect } from 'react';
import * as echarts from 'echarts';

const RainfallChart = () => {
  useEffect(() => {
    const rainChart = echarts.init(document.getElementById('rainfallChart'));
    const option = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
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
  }, []);

  return <div id='rainfallChart'></div>;
};

export default RainfallChart;
