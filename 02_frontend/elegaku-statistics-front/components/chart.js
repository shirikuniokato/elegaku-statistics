'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import Data from './web-api/data.json';

const Chart = () => {
  const labels = createLabels('12');
  const graphData = {
    labels: labels,
    datasets: createDatasets(Data),
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: '月ごとの勤務時間',
      },
    },
  };

  const divStyle = {
    width: '100%',
  };

  return (
    <Box style={divStyle}>
      <Line
        height={300}
        width={300}
        data={graphData}
        options={options}
        id='chart-key'
      />
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
  const sortedData = data.Items.sort((a, b) => (a.id > b.id ? 1 : -1));

  const result = [];
  let dateList = initializeDateList();
  let beforeId = '';
  let beforeName = '';
  let idCount = 0;
  for (const item of sortedData) {
    if (item.id === beforeId) {
      if (item.start !== '') {
        const end =
          item.end === '00:00'
            ? new Date('2020-10-15T' + item.end + ':00')
            : new Date('2020-10-14T' + item.end + ':00');
        const start = new Date('2020-10-14T' + item.start + ':00');

        dateList[parseInt(item.date.substring(8) - 1)] = parseInt(
          (end - start) / 1000 / 60 / 60
        );

        beforeId = item.id;
        beforeName = item.name;
        continue;
      }
    } else {
      // 一人目より後の場合、前回の人の情報をresultに追加
      if (idCount > 0) {
        let color1 = ~~(256 * Math.random());
        let color2 = ~~(256 * Math.random());
        let color3 = ~~(256 * Math.random());

        result.push({
          label: beforeName,
          data: dateList,
          borderColor: 'rgb(' + color1 + ', ' + color2 + ', ' + color3 + ')',
          backgroundColor:
            'rgb(' +
            color1 * 1.2 +
            ', ' +
            color2 * 1.2 +
            ', ' +
            color3 * 1.2 +
            ')',
        });
      }

      dateList = initializeDateList();
      if (item.start !== '') {
        const end =
          item.end === '00:00'
            ? new Date('2020-10-15T' + item.end + ':00')
            : new Date('2020-10-14T' + item.end + ':00');
        const start = new Date('2020-10-14T' + item.start + ':00');
        dateList[parseInt(item.date.substring(8) - 1)] = parseInt(
          (end - start) / 1000 / 60 / 60
        );
      }

      idCount++;
      beforeId = item.id;
      beforeName = item.name;
      continue;
    }
  }

  // 最後の一人がresultに追加されていない場合、追加
  if (result[result.length - 1].label !== beforeName) {
    let color1 = ~~(256 * Math.random());
    let color2 = ~~(256 * Math.random());
    let color3 = ~~(256 * Math.random());

    result.push({
      label: beforeName,
      data: dateList,
      borderColor: 'rgb(' + color1 + ', ' + color2 + ', ' + color3 + ')',
      backgroundColor:
        'rgb(' + color1 * 1.2 + ', ' + color2 * 1.2 + ', ' + color3 * 1.2 + ')',
    });
  }
  return result;
};

const initializeDateList = () => {
  const dateList = [];
  for (let i = 1; i <= 31; i++) {
    dateList.push(0);
  }
  return dateList;
};

export default Chart;
