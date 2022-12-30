'use client';

import { useEffect, useState } from 'react';

// Chakra UI関連
import { Tabs, Tab, TabPanels, TabPanel, TabList } from '@chakra-ui/react';

// その他
import PageTitle from '../../components/common/page-title';
import Statistics from '../../components/statistics/all/statistics';
import StatisticsGirl from '../../components/statistics/girl/statistics-girl';

export default function Page() {
  return (
    <>
      <PageTitle title="統計" />
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
