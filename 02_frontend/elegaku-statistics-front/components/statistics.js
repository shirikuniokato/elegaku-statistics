'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import Data from './web-api/data.json';

const Statistics = () => {
  const attendanceDays = getAttendanceDays(Data);
  return (
    <Box>
      <Box>出勤日数(月)： {attendanceDays}</Box>
      <Box>出勤時間(月)</Box>
      <Box>勤務時間</Box>
    </Box>
  );
};

const getAttendanceDays = (data) => {
  const sortedData = data.Items.sort((a, b) => (a.id > b.id ? 1 : -1));

  const result = [];
  let info = {
    id: '',
    name: '',
    days: 0,
  };
  let beforeId = '';
  let beforeName = '';
  let idCount = 0;
  for (const item of sortedData) {
    // ID判定
    if (item.id === beforeId) {
      // 前回レコードと同じIDの場合
      if (item.start !== '') {
        info.days++;
      }

      // 後処理
      beforeId = item.id;
      beforeName = item.name;
      continue;
    } else {
      // 前回レコードと異なるIDの場合

      // 一人目よりあとの場合、前回の人の情報をresultに追加
      if (idCount > 0) {
        result.push(info);
      }

      if (item.start !== '') {
        info = {
          id: item.id,
          name: item.name,
          days: 1,
        };
      } else {
        info = {
          id: item.id,
          name: item.name,
          days: 0,
        };
      }

      // 後処理
      idCount++;
      beforeId = item.id;
      beforeName = item.name;
      continue;
    }
  }

  result.sort((a, b) => (a.days > b.days ? -1 : 1));

  return (
    getResultMessage(result[0], 1) +
    ',' +
    getResultMessage(result[1], 2) +
    ',' +
    getResultMessage(result[2], 3)
  );
};

const getResultMessage = (result, rank) => {
  return rank + '位: ' + result.name + '(' + result.days + '日)';
};

export default Statistics;
