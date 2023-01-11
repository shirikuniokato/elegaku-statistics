import { useState, useEffect } from 'react';

// ライブラリ
import { Box } from '@chakra-ui/react';
// その他
import GirlList from './girl-select';
import GirlInfo from './girl-info';
import MonthCompare from '../common/month-compare';
import Line from '../../common/line';

import axios from 'axios';

import Calendar from '../../common/calendar/calendar';

const StatisticsGirl = () => {
  const [id, setId] = useState('');
  const [girls, setGirls] = useState([]);
  const [attendanceInformation, setAttendanceInformation] = useState({ count: 0, items: [] });
  const [attendanceInformationMonth, setAttendanceInformationMonth] = useState({});
  const [attendanceInformationMonthLast, setAttendanceInformationMonthLast] = useState({});

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const request = async () => {
      const response = await axios.get('https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/girl');
      setGirls(response.data.Items);
      // ロード完了
      setIsLoaded(true);
    };
    request();
  }, []);

  // 生徒選択時
  useEffect(() => {
    // ロード中
    setIsLoaded(false);

    // 未選択に戻した場合は何もしない
    if (id === '') return;

    const request = async () => {
      const date = new Date();
      const ym = `${date.getFullYear()}-${date.getMonth() + 1}`;
      const response = await axios.get(`https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/statistics/girl/init/${ym}/${id}`);
      setAttendanceInformation(response.data.attendanceInformation);
      setAttendanceInformationMonth(response.data.attendanceInformationMonthTotal.currentMonth);
      setAttendanceInformationMonthLast(response.data.attendanceInformationMonthTotal.lastMonth);
    };
    request();

    // ロード完了
    setIsLoaded(true);
  }, [id]);

  return (
    <>
      <Box mt={4} />
      <GirlList setId={setId} girls={girls} isLoaded={isLoaded} />
      <Box m={8} />
      <GirlInfo id={id} girls={girls} />
      <Box m={4} />

      {id === '' ? null : <Calendar attendanceInformation={attendanceInformation} />}
      {id === '' ? null : <Box mt={8}></Box>}
      <Line />
      {id === '' ? null : <Box mt={8}></Box>}
      {id === '' ? null : <MonthCompare isLoaded={isLoaded} attendancesMonthTotal={attendanceInformationMonth} attendancesMonthTotalLast={attendanceInformationMonthLast} />}
    </>
  );
};

export default StatisticsGirl;
