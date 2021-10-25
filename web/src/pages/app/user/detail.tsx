import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Stack,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import UserProfile from '../../../components/User/UserProfileCard';
import AsyncRender from '../../../components/lib/AsyncRender';
import EmptyPlaceholder from '../../../components/lib/EmptyPlaceholder';
import Notes from './sub/notes';
import UserProfileSkeleton from '../../../components/User/UserProfileSkeleton';
import mapStudentProfile from './utils';
import { UserMetaContext } from '../../../contexts';
import { alert } from '../../../utils';

const GET_STUDENT_PROFILE = loader('../../../queries/users/detail.gql');

const ConnectionDetail: React.FC<Record<string, never>> = () => {
  const { username: me } = useContext(UserMetaContext);
  const { username } = useParams<{ username: string }>();
  const [profile, setProfile] = useState<any>(null);
  const { error, loading } = useQuery(GET_STUDENT_PROFILE, {
    variables: {
      username,
      me,
    },
    onCompleted: ({ student }) => {
      setProfile(mapStudentProfile(student[0]));
    },
  });

  const DataDisplay = () => {
    return (
      <Stack>
        <UserProfile
          gradeLevel={profile.gradeLevel}
          fullname={profile.fullname}
          username={profile.username}
          bio={profile.bio}
          subjects={profile.subjects}
          profilePicture={profile.profilePicture}
          school={profile.school}
        />
        <Tabs isLazy>
          <TabList>
            <Tab>{`Notes(${profile.totalNotes})`}</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Notes username={username} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    );
  };
  const displayData = () => {
    if (profile !== null) {
      return DataDisplay();
    }
    return undefined;
  };
  return (
    <AsyncRender
      loading={loading}
      alert={alert(error)}
      skeleton={<UserProfileSkeleton />}
      data={displayData()}
      fallback={
        <EmptyPlaceholder icon="exclamation-circle" title="User Not Found" />
      }
    />
  );
};

export default ConnectionDetail;
