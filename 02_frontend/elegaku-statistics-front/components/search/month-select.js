'use client';

import { useEffect } from 'react';
import axios from 'axios';

// Chakra UI関連
import { Input, FormControl, FormLabel } from '@chakra-ui/react';

const MonthList = (props) => {
  const change = (e) => {
    props.setYm(e.target.value);
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
