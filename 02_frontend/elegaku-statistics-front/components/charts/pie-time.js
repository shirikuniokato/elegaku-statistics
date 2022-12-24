'use client';

import { Box, useEditable } from '@chakra-ui/react';
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Data from '../web-api/month.json';

const PieTime = () => {
  const data = {
    labels: createLabels(Data),
    datasets: [
      {
        label: '出勤時間',
        data: createData(Data),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: '出勤時間割合',
      },
      autocolors: {
        mode: 'data',
      },
      legend: {
        display: true,
      },
      datalabels: {
        color: 'white',
        formatter: function (value, context) {
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}\n${value.toString()}h`;
        },
        display: function (context) {
          var dataset = context.dataset;
          var count = dataset.data.length;
          var value = dataset.data[context.dataIndex];
          return value > count * 1.5;
        },
        font: {
          weight: 'bold',
        },
        padding: 6,
      },
    },
  };

  const divStyle = {
    width: '98%',
  };

  return (
    <Box style={divStyle} m="auto">
      <Pie height={300} width={300} data={data} options={options} id="time" />
    </Box>
  );
};

const createLabels = (data) => {
  const result = [];

  let count = 0;
  for (const item of data.Items.sort((a, b) => (a.attendanceTime < b.attendanceTime ? 1 : -1))) {
    if (item.attendanceTime === 0) continue;

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
  for (const item of data.Items.sort((a, b) => (a.attendanceTime < b.attendanceTime ? 1 : -1))) {
    if (item.attendanceTime === 0) continue;

    // ５位までは表示する
    if (count < 5) {
      result.push(item.attendanceTime);
      count++;
      continue;
    } else if (count === 5) {
      // ５位以降はその他にまとめる
      result.push(item.attendanceTime);
      count++;
      continue;
    } else {
      // ５位以降はその他にまとめる
      result[5] += item.attendanceTime;
      count++;
      continue;
    }
  }

  return result;
};

export default PieTime;
