'use client';

import { useEffect, useState } from 'react';

// Chakra UI関連
import { Tabs, Tab, TabPanels, TabPanel, TabList } from '@chakra-ui/react';

// その他
import Statistics from '../components/panel/statistics';
import StatisticsGirl from '../components/panel/statistics-girl';

export default function Page() {
  return (
    <>
      <Tabs isFitted variant="line" colorScheme="cyan">
        <TabList>
          <Tab>全体</Tab>
          <Tab>生徒別</Tab>
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
    </>
  );
}
