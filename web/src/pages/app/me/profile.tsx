import React, { useState, useContext } from 'react';
import { loader } from 'graphql.macro';
import { useQuery } from '@apollo/client';
import StudentProfile from '../../../components/User/StudentProfile';
import SubNavigation from '../../../components/lib/SubNavigation';
import EmptyPlaceholder from '../../../components/lib/EmptyPlaceholder';
import { alert } from '../../../utils';
import UserProfileSkeleton from '../../../components/User/UserProfileSkeleton';
import NavMenu from '../../../components/lib/NavMenu';
import actions from './nav_actions';
import AsyncRender from '../../../components/lib/AsyncRender';
import { UserMetaContext } from '../../../contexts';
import { mapStudentProfile } from './utils';

const GET_STUDENT_PROFILE = loader('../../../queries/users/detail.gql');

const Profile: React.FC<Record<string, never>> = () => {
  const { username } = useContext(UserMetaContext);
  const [profile, setProfile] = useState<any>(null);
  const { error, loading } = useQuery(GET_STUDENT_PROFILE, {
    variables: {
      username,
    },
    onCompleted: ({ student }) => {
      setProfile(mapStudentProfile(student[0]));
    },
  });

  const DataDisplay = () => {
    return (
      <>
        <SubNavigation
          goBack
          title="Your Profile"
          action={<NavMenu actions={actions} />}
        />
        <StudentProfile
          onUpdateProfilePicture={profile.fullname}
          fullname={profile.fullname}
          email={profile.email}
          username={profile.username}
          subjects={profile.subjects}
          school={profile.school}
          gradeLevel={profile.gradeLevel}
          profilePicture={profile.profilePicture}
        />
      </>
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

export default Profile;
