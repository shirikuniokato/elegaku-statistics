'use client';

// Chakra UI関連
import { Tabs, Tab, TabPanels, TabPanel, TabList } from '@chakra-ui/react';

// スライダー関連
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

// その他
import Statistics from '../components/panel/statistics';
import StatisticsGirl from '../components/panel/statistics-girl';

export default function Page() {
  return (
    <>
      <Tabs isFitted variant="line" colorScheme="cyan">
        <TabList>
          <Tab>全体</Tab>
          <Tab>女の子別</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Statistics />
          </TabPanel>
          <TabPanel>
            <StatisticsGirl />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* <AttendanceInformations /> */}
    </>
  );
}
