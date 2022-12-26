'use client';

import React from 'react';
import { Box, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup } from '@chakra-ui/react';

import Line from './common/line';
import Title from './common/title';

const CompareResult = (percent, result) => {
  return (
    <>
      <StatHelpText>
        {result ? <StatArrow type="increase" /> : <StatArrow type="decrease" />}
        {percent}%
      </StatHelpText>
    </>
  );
};

const roundDecimal = (value, n) => {
  return Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
};

const MonthCompare = (props) => {
  const dayPercent = roundDecimal(((props.attendancesMonthTotal.attendanceDays - props.attendancesMonthTotalLast.attendanceDays) / props.attendancesMonthTotalLast.attendanceDays) * 100, 2);
  const dayResult = props.attendancesMonthTotal.attendanceDays >= props.attendancesMonthTotalLast.attendanceDays;

  const timePercent = roundDecimal(((props.attendancesMonthTotal.attendanceTime - props.attendancesMonthTotalLast.attendanceTime) / props.attendancesMonthTotalLast.attendanceTime) * 100, 2);
  const timeResult = props.attendancesMonthTotal.attendanceTime >= props.attendancesMonthTotalLast.attendanceTime;

  return (
    <Box>
      <Title title="前月比" />
      <StatGroup>
        <Stat>
          <StatLabel>出勤日数</StatLabel>
          <StatNumber>{`${props.attendancesMonthTotal.attendanceDays}日`}</StatNumber>
          {CompareResult(dayPercent, dayResult)}
        </Stat>

        <Stat>
          <StatLabel>出勤時間</StatLabel>
          <StatNumber>{`${props.attendancesMonthTotal.attendanceTime}時間`}</StatNumber>
          {CompareResult(timePercent, timeResult)}
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default MonthCompare;
