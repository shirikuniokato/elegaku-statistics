'use client';

import ChartDataLabels from 'chartjs-plugin-datalabels';

import React from 'react';
import { Box } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import Data from '../web-api/data.json';

const ChartAllTime = () => {
  const labels = createLabels('12');
  const graphData = {
    labels: labels,
    datasets: createDatasets(Data),
  };

  const options = {
    responsive: true,
    plugins: [ChartDataLabels],
    plugins: {
      title: {
        display: true,
        text: '日ごとの出勤人数',
      },
      autocolors: {
        mode: 'data',
      },
    },
  };

  const divStyle = {
    width: '98%',
  };

  return (
    <Box style={divStyle} m="auto">
      <Line height={300} width={300} data={graphData} options={options} plugins={[ChartDataLabels]} />
    </Box>
  );
};

const createLabels = (m) => {
  const labels = [];
  for (let i = 1; i <= 31; i++) {
    labels.push(`${m}/${i}`);
  }
  return labels;
};

const createDatasets = (data) => {
  let result = [];
  let dateList = initializeDateList();

  // 日毎に勤務時間を集計
  for (const item of data.Items) {
    if (item.start !== '') {
      dateList[parseInt(item.date.substring(8) - 1)]++;
    }
  }
  result.push({
    label: '出勤人数',
    data: dateList,
    borderWidth: 1,
    datalabels: {
      formatter: function (value, context) {
        if (value === 0) return '';
        return `${value.toString()}人`;
      },
      display: 'auto',
      align: 'top',
    },
  });

  return result;
};

const initializeDateList = () => {
  const dateList = [];
  for (let i = 1; i <= 31; i++) {
    dateList.push(0);
  }
  return dateList;
};

export default ChartAllTime;
