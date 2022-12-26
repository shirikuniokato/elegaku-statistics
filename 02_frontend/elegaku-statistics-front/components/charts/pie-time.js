'use client';

import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Box } from '@chakra-ui/react';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import Data from '../web-api/month.json';

const PieTime = (props) => {
  const data = {
    labels: createLabels(Data.Items),
    datasets: [
      {
        label: '出勤時間',
        data: createData(Data.Items),
        borderWidth: 1,
        datalabels: {
          color: 'white',
          formatter: function (value, context) {
            const label = context.chart.data.labels[context.dataIndex];
            return `${label}\n${value.toString()}h`;
          },
          font: {
            weight: 'bold',
          },
        },
      },
    ],
  };

  const options = {
    plugins: [ChartDataLabels],
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
    },
  };

  const divStyle = {
    width: '98%',
  };

  return (
    <Box style={divStyle} m="auto">
      <Pie height={300} width={300} data={data} options={options} id="time" plugins={[ChartDataLabels]} />
    </Box>
  );
};

const createLabels = (data) => {
  const result = [];

  let count = 0;
  for (const item of data.sort((a, b) => (a.attendanceTime < b.attendanceTime ? 1 : -1))) {
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
  for (const item of data.sort((a, b) => (a.attendanceTime < b.attendanceTime ? 1 : -1))) {
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
