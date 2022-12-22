'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import Data from './web-api/month.json';

const Statistics = () => {
  const attendanceDays = getAttendanceDays(Data);
  const attendanceTime = getAttendanceTime(Data);
  return (
    <Box>
      <Box>出勤日数(月)： {attendanceDays}</Box>
      <Box>出勤時間(月)： {attendanceTime}</Box>
    </Box>
  );
};

const getAttendanceDays = (data) => {
  const sortedData = data.Items.sort((a, b) => (a.attendanceDays < b.attendanceDays ? 1 : -1));
  return getResultMessageDays(sortedData[0], 1) + ',' + getResultMessageDays(sortedData[1], 2) + ',' + getResultMessageDays(sortedData[2], 3);
};

const getResultMessageDays = (result, rank) => {
  return rank + '位: ' + result.name + '(' + result.attendanceDays + '日)';
};

const getAttendanceTime = (data) => {
  const sortedData = data.Items.sort((a, b) => (a.attendanceTime < b.attendanceTime ? 1 : -1));
  return getResultMessageTime(sortedData[0], 1) + ',' + getResultMessageTime(sortedData[1], 2) + ',' + getResultMessageTime(sortedData[2], 3);
};

const getResultMessageTime = (result, rank) => {
  return rank + '位: ' + result.name + '(' + result.attendanceTime + '時間)';
};

export default Statistics;
