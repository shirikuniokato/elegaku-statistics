'use client';

import React from 'react';
import { Text, Box, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup, Skeleton } from '@chakra-ui/react';

import Title from '../../common/item-title';

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
  const current = props.attendancesMonthTotal;
  const last = props.attendancesMonthTotalLast;
  let dayPercent = 0;
  let dayResult = 0;
  let timePercent = 0;
  let timeResult = 0;

  if (true) {
    dayPercent = roundDecimal(((current.item.attendanceDays - last.item.attendanceDays) / last.item.attendanceDays) * 100, 2);
    dayResult = current.item.attendanceDays >= last.item.attendanceDays;
    timePercent = roundDecimal(((current.item.attendanceTime - last.item.attendanceTime) / last.item.attendanceTime) * 100, 2);
    timeResult = current.item.attendanceTime >= last.item.attendanceTime;
  }

  return (
    <Box>
      <Title title="前月比" />
      {current.exist ? (
        <StatGroup>
          <Stat>
            <StatLabel>出勤日数</StatLabel>

            <Skeleton width="30vw" height="57px" isLoaded={props.isLoaded}>
              <StatNumber>{`${current.item.attendanceDays}日`}</StatNumber>
              {CompareResult(dayPercent, dayResult)}
            </Skeleton>
          </Stat>

          <Stat>
            <StatLabel>出勤時間</StatLabel>
            <Skeleton width="30vw" height="57px" isLoaded={props.isLoaded}>
              <StatNumber>{`${current.item.attendanceTime}時間`}</StatNumber>
              {CompareResult(timePercent, timeResult)}
            </Skeleton>
          </Stat>
        </StatGroup>
      ) : (
        <Skeleton isLoaded={props.isLoaded}>
          <Text w="350px" h="350px">
            データが存在しません。
          </Text>
        </Skeleton>
      )}
    </Box>
  );
};

export default MonthCompare;
