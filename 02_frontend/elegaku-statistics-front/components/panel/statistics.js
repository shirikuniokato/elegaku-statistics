'use client';

import { useState } from 'react';

// Chakra UI関連
import { Box } from '@chakra-ui/react';

// スライダー関連
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

// グラフ関連
import ChartAllTime from '../../components/charts/chart-all-time';
import PieTime from '../../components/charts/pie-time';
import PieDays from '../../components/charts/pie-days';

// その他
import MonthList from '../search/month-select';
import ChartList from '../../components/charts/chart-list';
import MonthCompare from '../month-compare';
import Rank from '../../components/rank';
import Line from '../common/line';

const Statistics = () => {
  const [values, setValues] = useState({
    ym: '',
    attendanceInformation: [],
    attendanceInformationMonth: [],
  });

  return (
    <>
      <Box>
        <MonthList values={values} setValues={setValues} />
        {values.ym}
        <Box mt={8}></Box>
        <Line />
        <ChartList />
        <Box mt={12}></Box>
        <Line />
        <MonthCompare />
        <Line />
        <Rank />
      </Box>
    </>
  );
};

export default Statistics;
