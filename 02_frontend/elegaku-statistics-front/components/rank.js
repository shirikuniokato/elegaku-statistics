'use client';

import React from 'react';
import { Flex, Text, Box, Heading } from '@chakra-ui/react';
import Data from './web-api/month.json';

const Rank = () => {
  const attendanceDays = Data.Items.sort((a, b) => (a.attendanceDays < b.attendanceDays ? 1 : -1));
  const attendanceTime = Data.Items.sort((a, b) => (a.attendanceTime < b.attendanceTime ? 1 : -1));

  return (
    <Box>
      <Heading size="md">出勤日数</Heading>
      <Box m="1vh" />
      {/* <Box>{attendanceDays}</Box> */}
      <Box>
        {attendanceDays.map((item, index) => {
          if (index > 4) return;
          return (
            <>
              <Flex key={index} h="5vh">
                <Box flex="2" align="center" m="auto">
                  <Text fontSize="lg">{`${index + 1}位`}</Text>
                </Box>
                <Box flex="5" align="left" m="auto">
                  <Text fontSize="lg">{item.name}</Text>
                </Box>
                <Box flex="2" align="right" m="auto">
                  <Text>{`${item.attendanceDays}日`}</Text>
                </Box>
              </Flex>
              <Box m="1vh"></Box>
            </>
          );
        })}
      </Box>
      <Heading size="md">出勤時間</Heading>
      <Box m="1vh" />
      <Box>
        {attendanceTime.map((item, index) => {
          if (index > 4) return;
          return (
            <>
              <Flex key={index} h="5vh">
                <Box flex="2" align="center" m="auto">
                  <Text fontSize="lg">{`${index + 1}位`}</Text>
                </Box>
                <Box flex="5" align="left" m="auto">
                  <Text fontSize="lg">{item.name}</Text>
                </Box>
                <Box flex="2" align="right" m="auto">
                  <Text>{`${item.attendanceTime}時間`}</Text>
                </Box>
              </Flex>
              <Box m="1vh"></Box>
            </>
          );
        })}
      </Box>
    </Box>
  );
};

const getAttendanceDays = (data) => {
  const sortedData = data.Items.sort((a, b) => (a.attendanceDays < b.attendanceDays ? 1 : -1));
  return getResultMessageDays(sortedData[0], 1) + ',' + getResultMessageDays(sortedData[1], 2) + ',' + getResultMessageDays(sortedData[2], 3);
};

const getResultMessageDays = (result, rank) => {
  const value = `${rank}位:${result.name}(${rank}日)`;
  return value;
};

const getAttendanceTime = (data) => {
  const sortedData = data.Items.sort((a, b) => (a.attendanceTime < b.attendanceTime ? 1 : -1));
  return getResultMessageTime(sortedData[0], 1) + ',' + getResultMessageTime(sortedData[1], 2) + ',' + getResultMessageTime(sortedData[2], 3);
};

const getResultMessageTime = (result, rank) => {
  return rank + '位: ' + result.name + '(' + result.attendanceTime + '時間)';
};

export default Rank;
