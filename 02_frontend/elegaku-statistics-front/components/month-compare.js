'use client';

import React from 'react';
import { Box, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup } from '@chakra-ui/react';

import Line from './common/line';
import Title from './common/title';

const MonthCompare = () => {
  return (
    <Box>
      <Title title="前月比" />
      <StatGroup>
        <Stat>
          <StatLabel>出勤日数</StatLabel>
          <StatNumber>100日</StatNumber>
          <StatHelpText>
            <StatArrow type="increase" />
            23.36%
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>出勤時間</StatLabel>
          <StatNumber>2,000時間</StatNumber>
          <StatHelpText>
            <StatArrow type="decrease" />
            9.05%
          </StatHelpText>
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default MonthCompare;
