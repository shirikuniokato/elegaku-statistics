import { useState, useEffect } from 'react';

// ライブラリ
import { Box } from '@chakra-ui/react';
// その他
import GirlList from './girl-select';
import GirlInfo from './girl-info';
import MonthCompare from '../common/month-compare';
import Line from '../../common/line';

import axios from 'axios';

const StatisticsGirl = () => {
  const [id, setId] = useState('');
  const [girls, setGirls] = useState([]);
  const [attendanceInformation, setAttendanceInformation] = useState({});
  // const [attendanceInformationMonth, setAttendanceInformationMonth] = useState({});
  // const [attendanceInformationMonthLast, setAttendanceInformationMonthLast] = useState({});

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
      const responseMonth = await axios.get(`https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/statistics/girl/init/${ym}/${id}`);
      setAttendanceInformation(responseMonth.data.attendanceInformation);
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
      {id === '' ? null : <Box mt={8}></Box>}
      <Line />
      {id === '' ? null : <Box mt={8}></Box>}
      {/* {id === '' ? null : <MonthCompare isLoaded={isLoaded} attendancesMonthTotal={attendanceInformationMonth} attendancesMonthTotalLast={attendanceInformationMonthLast} />} */}
    </>
  );
};

export default StatisticsGirl;
