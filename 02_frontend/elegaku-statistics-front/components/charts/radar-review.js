'use client';

import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Box } from '@chakra-ui/react';
import React from 'react';
import { Radar } from 'react-chartjs-2';

const Review = (props) => {
  const data = {
    labels: ['顔', '身体', '愛嬌', 'サービス', 'エロ', 'テク'],
    datasets: [
      {
        data: [props.item.face, props.item.body, props.item.charm, props.item.service, props.item.erotic, props.item.technique],
        borderWidth: 1,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scale: {
      min: 0,
      max: 100,
      stepSize: 20,
    },
  };

  return <Radar height={300} width={300} data={data} options={options} id="review" />;
};

export default Review;
