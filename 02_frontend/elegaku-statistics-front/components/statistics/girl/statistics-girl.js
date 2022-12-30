import { useState, useEffect } from 'react';

// ライブラリ
import { Box } from '@chakra-ui/react';
// その他
import Line from '../../common/line';
import GirlList from './girl-select';
import GirlInfo from './girl-info';
import MonthCompare from '../common/month-compare';

import axios from 'axios';

const StatisticsGirl = () => {
  const [id, setId] = useState('');
  const [girls, setGirls] = useState([]);
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
      const last = `${date.getFullYear()}-${date.getMonth()}`;
      const responseMonth = await axios.get(`https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/attendance-information-month/${ym}/${id}`);
      setAttendanceInformationMonth(responseMonth.data.Items[0]);
      const responseMonthLast = await axios.get(`https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/attendance-information-month/${last}/${id}`);
      setAttendanceInformationMonthLast(responseMonthLast.data.Items[0]);
    };
    request();

    // ロード完了
    setIsLoaded(true);
  }, [id]);

  return (
    <>
      <Box mt={4} />
      <GirlList setId={setId} girls={girls} />
      <Box m={8} />
      <GirlInfo id={id} girls={girls} />
      {id === '' ? null : (
        <>
          <Box mt={8}></Box>
          {/* <Line /> */}
        </>
      )}
      {id === '' ? null : <MonthCompare isLoaded={isLoaded} attendancesMonthTotal={attendanceInformationMonth} attendancesMonthTotalLast={attendanceInformationMonthLast} />}
    </>
  );
};

export default StatisticsGirl;
