'use client';

import { useEffect, useState } from 'react';

// Chakra UI関連
import { Box, Text } from '@chakra-ui/react';

// 非同期通信
import axios from 'axios';

// その他
import MonthList from './month-select';
import ChartList from '../../charts/chart-list';
import MonthCompare from '../common/month-compare';
import Rank from './rank';
import Line from '../../common/line';

const Statistics = () => {
  const [ym, setYm] = useState(`${new Date().getFullYear()}-${new Date().getMonth() + 1}`);
  const [attendanceInformation, setAttendanceInformation] = useState({ isError: false, errorMessage: '', count: 0, items: [] });
  const [attendanceInformationMonth, setAttendanceInformationMonth] = useState({ isError: false, errorMessage: '', count: 0, items: [] });
  const [attendanceInformationMonthTotal, setAttendanceInformationMonthTotal] = useState({ isError: false, errorMessage: '', exist: true, item: {} });
  const [attendanceInformationMonthTotalLast, setAttendanceInformationMonthTotalLast] = useState({ isError: false, errorMessage: '', exist: true, item: {} });

  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  // 初期表示時
  useEffect(() => {
    const fetch = async () => {
      // ロード中
      setIsLoaded(false);
      setIsError(false);

      // 変数ymをyyyy-m形式へ変換
      const requestYm = `${ym.split('-')[0]}-${parseInt(ym.split('-')[1])}`;
      try {
        const response = await axios.get(`https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/statistics/init/${requestYm}`);
        setAttendanceInformation(response.data.attendanceInformation);
        setAttendanceInformationMonth(response.data.attendanceInformationMonth);
        setAttendanceInformationMonthTotal(response.data.attendanceInformationMonthTotal.currentMonth);
        setAttendanceInformationMonthTotalLast(response.data.attendanceInformationMonthTotal.lastMonth);
      } catch (err) {
        setIsError(true);
      }
      // ロード完了
      setIsLoaded(true);
    };
    fetch();
  }, []);

  // 対象年月変更時
  useEffect(() => {
    const fetch = async () => {
      // ロード中
      setIsLoaded(false);
      setIsError(false);

      // 変数ymをyyyy-m形式へ変換
      const requestYm = `${ym.split('-')[0]}-${parseInt(ym.split('-')[1])}`;
      try {
        const response = await axios.get(`https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/statistics/init/${requestYm}`);
        setAttendanceInformation(response.data.attendanceInformation);
        setAttendanceInformationMonth(response.data.attendanceInformationMonth);
        setAttendanceInformationMonthTotal(response.data.attendanceInformationMonthTotal.currentMonth);
        setAttendanceInformationMonthTotalLast(response.data.attendanceInformationMonthTotal.lastMonth);
      } catch (err) {
        // エラー発生
        setIsError(true);
      }
      // ロード完了
      setIsLoaded(true);
    };
    fetch();
  }, [ym]);

  return (
    <>
      <Box mt={4} />
      <MonthList setYm={setYm} />
      <Box mt={8}></Box>
      <Line />

      <Box>
        {isError ? (
          <Text color="red.500">データ取得中にエラーが発生しました。</Text>
        ) : (
          <Box>
            <ChartList isLoaded={isLoaded} ym={ym} attendances={attendanceInformation} attendancesMonth={attendanceInformationMonth} />
            <Box mt={12}></Box>
            <MonthCompare isLoaded={isLoaded} attendancesMonthTotal={attendanceInformationMonthTotal} attendancesMonthTotalLast={attendanceInformationMonthTotalLast} />
            <Box mt={12} />
            <Rank isLoaded={isLoaded} attendancesMonth={attendanceInformationMonth} />
          </Box>
        )}
      </Box>
    </>
  );
};
export default Statistics;
