'use client';

import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Box } from '@chakra-ui/react';
import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieDays = (props) => {
  const data = {
    labels: createLabels(props.attendancesMonth),
    datasets: [
      {
        label: '出勤日数',
        data: createData(props.attendancesMonth),
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
        backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(153, 102, 255)'],
        borderColor: ['rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 255)'],
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
      legend: {
        display: true,
      },
    },
  };

  return (
    <Box w="350px" h="350px" m="auto">
      <Pie height={300} width={300} data={data} options={options} id="days" plugins={[ChartDataLabels]} />
    </Box>
  );
};

const createLabels = (data) => {
  const result = [];

  let count = 0;
  for (const item of data.sort((a, b) => (a.attendanceDays < b.attendanceDays ? 1 : -1))) {
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
  for (const item of data.sort((a, b) => (a.attendanceDays < b.attendanceDays ? 1 : -1))) {
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
