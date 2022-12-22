'use client';

import AttendanceInformations from '../components/web-api/get-attendance-informations';
import Chart from '../components/charts/chart';
import Statistics from '../components/statistics';
import { Tabs, Tab, TabPanels, TabPanel, TabList, Link } from '@chakra-ui/react';

export default function Page() {
  return (
    <>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>全体</Tab>
          <Tab>女の子別</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Chart />
            <Statistics />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* <AttendanceInformations /> */}
    </>
  );
}
