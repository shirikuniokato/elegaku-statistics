'use client';

import { useEffect, useState } from 'react';

// Chakra UI関連
import { Box } from '@chakra-ui/react';

// 非同期通信
import axios from 'axios';

// その他
import MonthList from '../search/month-select';
import ChartList from '../../components/charts/chart-list';
import MonthCompare from '../month-compare';
import Rank from '../../components/rank';
import Line from '../common/line';

// 検証用
import monthData from '../web-api/month.json';

import { AttendanceContext } from '../../app/page';

const Statistics = () => {
  const [ym, setYm] = useState(`${new Date().getFullYear()}-${new Date().getMonth() + 1}`);
  const [attendanceInformation, setAttendanceInformation] = useState([]);
  const [attendanceInformationMonth, setAttendanceInformationMonth] = useState([]);
  const [attendanceInformationMonthTotal, setAttendanceInformationMonthTotal] = useState({});
  const [attendanceInformationMonthTotalLast, setAttendanceInformationMonthTotalLast] = useState({});

  // 初期表示時
  useEffect(() => {
    const request = async () => {
      const sysDate = new Date();
      const defaultYm = `${sysDate.getFullYear()}-${sysDate.getMonth() + 1}`;

      const responseInformation = await axios.get(`https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/attendance-information/ym/${ym}`);
      setAttendanceInformation(responseInformation.data.Items);
      const responseMonth = await axios.get(`https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/attendance-information-month/${defaultYm}`);
      setAttendanceInformationMonth(responseMonth.data.Items);

      const param = `${sysDate.getFullYear()}-${sysDate.getMonth()}`;
      const responseMonthTotal = await axios.get(`https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/attendance-information-month-total/${defaultYm}`);
      setAttendanceInformationMonthTotal(responseMonthTotal.data.Item);
      console.log(param);
      const responseMonthTotalLast = await axios.get(`https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/attendance-information-month-total/${param}`);
      setAttendanceInformationMonthTotalLast(responseMonthTotalLast.data.Item);
    };
    request();
  }, []);

  // 対象年月変更時
  useEffect(() => {
    const request = async () => {
      const responseInformation = await axios.get(`https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/attendance-information/ym/${ym}`);
      setAttendanceInformation(responseInformation.data.Items);
      const responseMonth = await axios.get(`https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/attendance-information-month/${ym}`);
      setAttendanceInformationMonth(responseMonth.data.Items);

      const date = new Date(ym.split('-')[0], ym.split('-')[1], 0);
      const param = `${date.getFullYear()}-${date.getMonth()}`;
      const responseMonthTotal = await axios.get(`https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/attendance-information-month-total/${ym}`);
      setAttendanceInformationMonthTotal(responseMonthTotal.data.Item);
      const responseMonthTotalLast = await axios.get(`https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/attendance-information-month-total/${param}`);
      setAttendanceInformationMonthTotalLast(responseMonthTotalLast.data.Item);
    };
    request();
  }, [ym]);

  return (
    <>
      <Box>
        <MonthList setYm={setYm} />
        <Box mt={8}></Box>
        <Line />
        <ChartList attendances={attendanceInformation} attendancesMonth={attendanceInformationMonth} />
        <Box mt={12}></Box>
        <Line />
        <MonthCompare attendancesMonthTotal={attendanceInformationMonthTotal} attendancesMonthTotalLast={attendanceInformationMonthTotalLast} />
        <Line />
        <Rank attendancesMonth={attendanceInformationMonth} />
      </Box>
    </>
  );
};
export default Statistics;
