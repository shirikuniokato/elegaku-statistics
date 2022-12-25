'use client';

import { useState } from 'react';

// Chakra UI関連
import { Box } from '@chakra-ui/react';

// 非同期通信
import axios from 'axios';

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

import { AttendanceContext } from '../../app/page';

const Statistics = () => {
  const [values, setValues] = useState({
    ym: '',
    attendanceInformation: [],
    attendanceInformationMonth: [],
    attendanceInformationMonthTotal: [],
  });

  return (
    <>
      <Box>
        <MonthList values={values} setValues={setValues} />
        <Box mt={8}></Box>
        <Line />
        <ChartList attendances={values.attendanceInformation} attendancesMonth={values.attendanceInformationMonth} />
        <Box mt={12}></Box>
        <Line />
        <MonthCompare attendancesMonthTotal={values.attendanceInformationMonthTotal} />
        <Line />
        <Rank attendancesMonth={values.attendanceInformationMonth} />
      </Box>
    </>
  );
};

const getAttendanceInformation = async (ym) => {
  const requestUrl = `https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/attendance-information/ym/${ym}`;

  let result = [];
  await axios
    .get(requestUrl)
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      result = [];
    });

  return result;
};

const getAttendanceInformationMonth = async (ym) => {
  const requestUrl = `https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/attendance-information-month/${ym}`;

  let result = [];
  await axios
    .get(requestUrl)
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      result = [];
    });

  return result;
};
const getAttendanceInformationMonthTotal = async (ym) => {
  const requestUrl = `https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/attendance-information-month-total/${ym}`;

  let result = {};
  await axios
    .get(requestUrl)
    .then((response) => {
      result = response.data;
    })
    .catch((error) => {
      result = {};
    });

  console.log(result);
  return result;
};

export default Statistics;
