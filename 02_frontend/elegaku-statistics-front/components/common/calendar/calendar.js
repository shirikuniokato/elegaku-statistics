'use client';
import { Flex, Box, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
dayjs.locale(ja);

import Header from './header';
import Footer from './footer';

export default (props) => {
  return (
    <>
      <Box border="1px" borderColor="gray.200" borderRadius="md" shadow="md" p={3}>
        <Header />
        <Flex flexFlow="column">{main(props.attendanceInformation.items)}</Flex>
        <Footer />
      </Box>
    </>
  );
};

const label = () => {
  const weeks = ['日', '月', '火', '水', '木', '金', '土'];
  const result = [];

  for (const w of weeks) {
    if (w === '日') {
      result.push(
        <Box color="red" flex={1}>
          <Text fontSize="sm" textAlign="center">
            {w}
          </Text>
        </Box>
      );
    } else if (w === '土') {
      result.push(
        <Box color="blue" flex={1}>
          <Text fontSize="sm" textAlign="center">
            {w}
          </Text>
        </Box>
      );
    } else {
      result.push(
        <Box flex={1}>
          <Text fontSize="sm" textAlign="center">
            {w}
          </Text>
        </Box>
      );
    }
  }

  return result;
};

const main = (attendanceList) => {
  const result = [];

  // 曜日を追加
  result.push(<Flex>{label()}</Flex>);

  // 月初から月末までの日付を追加
  const now = dayjs();
  let current = now.startOf('month');
  const end = now.endOf('month');
  [];
  let week = ['', '', '', '', '', '', ''];
  while (true) {
    // 出勤判定
    const isAttendance = judgeAttendance(current, attendanceList);

    // weekに日付を追加
    if (current.format('D') === '1') {
      // 月初の場合
      let count = 0;
      for (let d = current.format('d'); d >= 0; d--) {
        if (d === current.format('d')) {
          // 当月分
          week[d] = createDayItem(current.add(count, 'day'), isAttendance, true);
        } else {
          // 先月分
          week[d] = createDayItem(current.add(count, 'day'), isAttendance, false);
        }

        count--;
      }
    } else if (current.format('YYYYMMDD') === end.format('YYYYMMDD')) {
      // 月末の場合
      let count = 0;
      for (let d = current.format('d'); d <= 6; d++) {
        if (d === current.format('d')) {
          // 当月分
          week[d] = createDayItem(current.add(count, 'day'), isAttendance, true);
        } else {
          // 来月分
          week[d] = createDayItem(current.add(count, 'day'), isAttendance, false);
        }
        count++;
      }
    } else {
      week[current.format('d')] = createDayItem(current, isAttendance, true);
    }

    // 週終わり（土曜日）または月末の場合、resultに追加し、weekを初期化
    if (current.format('d') === '6' || current.format('YYYYMMDD') === end.format('YYYYMMDD')) {
      result.push(
        <Flex h="55px" justifyContent="center" borderTop="1px" borderTopColor="gray.100">
          {week}
        </Flex>
      );
      week = initWeek();
    }

    // 月末まで繰り返した場合、終了
    if (current.format('YYYYMMDD') === end.format('YYYYMMDD')) {
      break;
    }

    // 1日進める
    current = current.add(1, 'day');
  }

  return result;
};

const judgeAttendance = (targetDate, attendanceList) => {
  const targetFormat = targetDate.format('YYYY-M-D');

  for (const a of attendanceList) {
    if (a.start === '' || a.end === '') continue;
    if (a.date === targetFormat) {
      return true;
    }
  }

  return false;
};

const initWeek = () => {
  return ['', '', '', '', '', '', ''];
};

const createDayItem = (date, isAttendance, isCurrentMonth) => {
  return (
    <Box flex={1}>
      {isCurrentMonth ? (
        <Text textAlign="center">{date.format('D')}</Text>
      ) : (
        <Text textAlign="center" color="gray.400">
          {date.format('D')}
        </Text>
      )}

      {!isAttendance ? null : (
        <Box m="auto" w="20px" borderRadius="md" mt="3px" bgColor="red.400">
          <Text color="white" textAlign="center" fontSize="sm">
            出
          </Text>
        </Box>
      )}
    </Box>
  );
};
