import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react';
import SubNavigation from '../../../components/lib/SubNavigation';
import Reports from './sub/manage-reports';

const Manage = () => {
  return (
    <>
      <SubNavigation title="Moderator Dashboard" />
      <Tabs isLazy>
        <TabList>
          <Tab>Reported Notes</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Reports />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Manage;
