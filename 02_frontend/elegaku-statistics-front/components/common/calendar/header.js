'use client';
import { Box, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
dayjs.locale(ja);

const Header = () => {
  return (
    <>
      <Box mb="10px">
        <Text fontSize="lg" fontWeight="bold" textAlign="center">
          {dayjs().format('YYYY年MM月')}の出勤表
        </Text>
      </Box>
    </>
  );
};

export default Header;
