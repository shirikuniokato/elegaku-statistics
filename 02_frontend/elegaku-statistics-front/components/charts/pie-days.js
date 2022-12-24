'use client';

import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Box } from '@chakra-ui/react';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import Data from '../web-api/month.json';

const PieDays = () => {
  const data = {
    labels: createLabels(Data),
    datasets: [
      {
        label: '出勤日数',
        data: createData(Data),
        borderWidth: 1,
        datalabels: {
          color: 'white',
          formatter: function (value, context) {
            const label = context.chart.data.labels[context.dataIndex];
            return `${label}\n${value.toString()}日`;
          },
          font: {
            weight: 'bold',
          },
        },
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: [ChartDataLabels],
    plugins: {
      title: {
        display: true,
        text: '出勤日数割合',
      },
      autocolors: {
        mode: 'data',
      },
      legend: {
        display: true,
      },
    },
  };

  const divStyle = {
    width: '98%',
  };

  return (
    <Box style={divStyle} m="auto">
      <Pie height={300} width={300} data={data} options={options} id="days" plugins={[ChartDataLabels]} />
    </Box>
  );
};

const createLabels = (data) => {
  const result = [];

  let count = 0;
  for (const item of data.Items.sort((a, b) => (a.attendanceDays < b.attendanceDays ? 1 : -1))) {
    if (item.attendanceDays === 0) continue;

    if (count < 5) {
      result.push(item.name);
    }
    count++;
  }

  // ５位以降はその他にまとめる
  if (count >= 5) result.push('その他');

  return result;
};
const createData = (data) => {
  const result = [];

  let count = 0;
  for (const item of data.Items.sort((a, b) => (a.attendanceDays < b.attendanceDays ? 1 : -1))) {
    if (item.attendanceDays === 0) continue;

    // ５位までは表示する
    if (count < 5) {
      result.push(item.attendanceDays);
      count++;
      continue;
    } else if (count === 5) {
      // ５位以降はその他にまとめる
      result.push(item.attendanceDays);
      count++;
      continue;
    } else {
      // ５位以降はその他にまとめる
      result[5] += item.attendanceDays;
      count++;
      continue;
    }
  }

  return result;
};

export default PieDays;
