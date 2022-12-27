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

const Statistics = () => {
  const [ym, setYm] = useState(`${new Date().getFullYear()}-${new Date().getMonth() + 1}`);
  const [attendanceInformation, setAttendanceInformation] = useState([]);
  const [attendanceInformationMonth, setAttendanceInformationMonth] = useState([]);
  const [attendanceInformationMonthTotal, setAttendanceInformationMonthTotal] = useState({});
  const [attendanceInformationMonthTotalLast, setAttendanceInformationMonthTotalLast] = useState({});

  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  // 初期表示時
  useEffect(() => {
    console.log(ym);
    const request = async () => {
      await axios
        .get(`https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/elegaku-statistics/init/${ym}`)
        .then((res) => {
          console.log(res);
          const response = JSON.stringify(res);
          console.log(response);
          setAttendanceInformation(response.data.attendanceInformation.items);
          setAttendanceInformationMonth(response.data.attendanceInformationMonth.items);
          setAttendanceInformationMonthTotal(response.data.attendanceInformationMonthTotal.currentMonth.item);
          setAttendanceInformationMonthTotalLast(response.data.attendanceInformationMonthTotal.lastMonth.item);
        })
        .catch((e) => {
          setIsError(true);
          console.log(e);
        });

      // ロード完了
      setIsLoaded(true);
    };
    request();
  }, []);

  // 対象年月変更時
  useEffect(() => {
    const request = async () => {
      // ロード中
      setIsLoaded(false);

      // await axios
      //   .get(`https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/elegaku-statistics/init/${ym}`)
      //   .then((response) => {
      //     const responseJson = JSON.stringify(response.data);
      //     console.log(responseJson);
      //     setAttendanceInformation(responseJson.data.attendanceInformation.items);
      //     setAttendanceInformationMonth(responseJson.data.attendanceInformationMonth.items);
      //     setAttendanceInformationMonthTotal(responseJson.data.attendanceInformationMonthTotal.currentMonth.item);
      //     setAttendanceInformationMonthTotalLast(responseJson.data.attendanceInformationMonthTotal.lastMonth.item);
      //   })
      //   .catch((e) => {
      //     setIsError(true);
      //     console.log(e);
      //   });

      // ロード完了
      setIsLoaded(true);
    };
    request();
  }, [ym]);

  return (
    <>
      <MonthList setYm={setYm} />
      <Box mt={8}></Box>
      <Line />

      <Box>
        {isError ? (
          <Box>データ取得時にエラーが発生しました。</Box>
        ) : (
          <Box>
            <ChartList isLoaded={isLoaded} ym={ym} attendances={attendanceInformation} attendancesMonth={attendanceInformationMonth} />
            <Box mt={12}></Box>
            <Line />
            <MonthCompare isLoaded={isLoaded} attendancesMonthTotal={attendanceInformationMonthTotal} attendancesMonthTotalLast={attendanceInformationMonthTotalLast} />
            <Line />
            <Rank isLoaded={isLoaded} attendancesMonth={attendanceInformationMonth} />
          </Box>
        )}
      </Box>
    </>
  );
};
export default Statistics;
