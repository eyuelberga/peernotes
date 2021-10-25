import React from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react';
import Manage from './sub/manage-notes';
import SubNavigation from '../../../components/lib/SubNavigation';
import NavMenu from '../../../components/lib/NavMenu';
import actions from './nav_actions';

const ManageNotes: React.FC<Record<string, never>> = () => {
  return (
    <>
      <SubNavigation
        goBack
        title="Your Notes"
        action={<NavMenu actions={actions} />}
      />
      <Tabs isLazy>
        <TabList>
          <Tab>Drafts</Tab>
          <Tab>Published</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Manage />
          </TabPanel>
          <TabPanel>
            <Manage published />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ManageNotes;
