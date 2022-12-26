'use client';

import React from 'react';
import { Flex, Text, Box, InputRightElement } from '@chakra-ui/react';

import Line from './common/line';
import Title from './common/title';

const Rank = (props) => {
  return (
    <Box>
      <Title title="出勤日数" />
      <Box>
        {props.attendancesMonth
          .sort((a, b) => (a.attendanceDays < b.attendanceDays ? 1 : -1))
          .map((item, index) => {
            if (item.attendanceDays === 0) return;
            if (index > 4) return;
            return (
              <>
                <Box>
                  <Flex h="5vh">
                    <Box flex="2" align="center" m="auto">
                      <Text fontSize="md">{`${index + 1}位`}</Text>
                    </Box>
                    <Box flex="5" align="left" m="auto">
                      <Text fontSize="md">{item.name}</Text>
                    </Box>
                    <Box flex="2" align="right" m="auto">
                      <Text fontSize="md">{`${item.attendanceDays}日`}</Text>
                    </Box>
                  </Flex>
                  <Box m="1vh"></Box>
                </Box>
              </>
            );
          })}
      </Box>

      <Line />

      <Title title="出勤時間" />
      <Box>
        {props.attendancesMonth
          .sort((a, b) => (a.attendanceTime < b.attendanceTime ? 1 : -1))
          .map((item, index) => {
            if (index > 4) return;
            return (
              <>
                <Box>
                  <Flex key={index} h="5vh">
                    <Box flex="2" align="center" m="auto">
                      <Text fontSize="md">{`${index + 1}位`}</Text>
                    </Box>
                    <Box flex="5" align="left" m="auto">
                      <Text fontSize="md">{item.name}</Text>
                    </Box>
                    <Box flex="2" align="right" m="auto">
                      <Text fontSize="md">{`${item.attendanceTime}時間`}</Text>
                    </Box>
                  </Flex>
                  <Box m="1vh"></Box>
                </Box>
              </>
            );
          })}
      </Box>
    </Box>
  );
};

export default Rank;
