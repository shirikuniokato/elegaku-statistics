'use client';

import { useEffect } from 'react';
import axios from 'axios';

// Chakra UI関連
import { Input, FormControl, FormLabel } from '@chakra-ui/react';

const MonthList = (props) => {
  const change = (e) => {
    const ym = e.target.value;
    const beforeYm = new Date(ym.split('-')[0], ym.split('-')[1] - 1, 0).toISOString().slice(0, 7);

    // 日＋女の子ごとの出勤情報取得
    // const attendances = getAttendanceInformation(ym);
    // 月の女の子ごとの集計結果取得
    // const attendancesMonth = getAttendanceInformationMonth(ym);
    // 月単位の集計結果取得
    // const attendancesMonthTotal = [];
    // attendancesMonthTotal.push(getAttendanceInformationMonthTotal(ym));
    // attendancesMonthTotal.push(getAttendanceInformationMonthTotal(beforeYm));

    useEffect(() => {
      async () => {
        console.log('非同期');
        const attendancesMonth = await axios.get(`https://9in4ev8es3.execute-api.ap-northeast-1.amazonaws.com/attendance-information-month/${ym}`).catch((error) => {
          return [];
        });
        props.setValues({
          ym: e.target.value,
          attendanceInformationMonth: attendancesMonth.data.Items,
        });
      };
    }, []);
  };

  const date = new Date();
  const defaultYearMonth = date.getFullYear() + '-' + (date.getMonth() + 1);

  return (
    <>
      <FormControl>
        <FormLabel>対象年月</FormLabel>
        <Input placeholder="対象年月を設定してください" size="md" type="month" defaultValue={defaultYearMonth} onChange={change} />
      </FormControl>
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

  return result;
};

export default MonthList;
