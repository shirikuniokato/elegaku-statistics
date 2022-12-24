'use client';

// Chakra UI関連
import { Box } from '@chakra-ui/react';

// スライダー関連
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

// グラフ関連
import 'chart.js/auto';
import { Chart as ChartJS } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Chart from '../../components/charts/chart';
import PieTime from '../../components/charts/pie-time';
import PieDays from '../../components/charts/pie-days';
ChartJS.register(ChartDataLabels);

// その他
import MonthList from '../search/month-select';
import Rank from '../../components/rank';

const Statistics = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Box>
        <MonthList />
        <Box mt={8}></Box>
        <Slider {...settings}>
          <PieTime />
          <PieDays />
          <Chart />
        </Slider>
        <Box mt={12}></Box>
        <Rank />
      </Box>
    </>
  );
};

export default Statistics;
