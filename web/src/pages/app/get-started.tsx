import React, { useContext, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Stack, Box } from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import CallToAction from '../../components/Home/CallToAction';
import GetStartedForm from '../../components/User/GetStartedForm';
import { UserMetaContext } from '../../contexts';
import { toastifyError } from '../../utils';
import { GetStarted } from '../../interfaces';
import DashboardLayout from '../../layouts/Dashboard';
import { APP_PATH, FEED } from '../../config/constants';

const ACTIVATE_ACCOUNT = loader('../../queries/users/activate-account.gql');

const Default = () => {
  const historyRef = useRef(useHistory());
  const metaRef = useRef(useContext(UserMetaContext));

  useEffect(() => {
    if (metaRef.current.accountStatus === 'activated') {
      historyRef.current.push(`${APP_PATH}/${FEED}`);
    }
  }, []);
  const [activate, { loading }] = useMutation(ACTIVATE_ACCOUNT, {
    onError: (e) => {
      toastifyError(e);
    },
    onCompleted: () => {
      historyRef.current.push(`${APP_PATH}/${FEED}`);
      window.location.reload();
    },
  });
  const activateAccount = (v: GetStarted) => {
    const { school, gradeLevel, fullname, subjects: ss } = v;
    const subjects = ss.map((s) => {
      return { subject: s };
    });
    activate({
      variables: {
        school,
        grade_level: gradeLevel,
        fullname,
        subjects,
        username: metaRef.current.username,
      },
    });
  };

  return (
    <DashboardLayout minimal>
      <Stack>
        <CallToAction
          title="Get "
          body="Started"
          description="Let's get you started by completing this form."
        />
        <Box>
          <Box m={[2, 5]}>
            <GetStartedForm onSave={activateAccount} isLoading={loading} />
          </Box>
        </Box>
      </Stack>
    </DashboardLayout>
  );
};

export default Default;
