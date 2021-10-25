import {
  Box,
  Flex,
  Stack,
  Heading,
  FlexProps,
  BoxProps,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import * as React from 'react';

import { StudentProfileProps } from './props';
import ImageUploader from '../lib/async/ImageUploader';

interface PropertyProps extends FlexProps {
  // eslint-disable-next-line react/no-unused-prop-types
  label: string;
  // eslint-disable-next-line react/no-unused-prop-types
  value: string | string[];
}
export const Card: React.FC<BoxProps> = (props) => (
  <Box
    bg={useColorModeValue('white', 'gray.700')}
    rounded={{ md: 'lg' }}
    shadow="base"
    overflow="hidden"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
);
interface HeaderProps {
  title: string;
  action?: React.ReactNode;
}
export const Property: React.FC<PropertyProps> = (props) => {
  const { label, value: val, ...flexProps } = props;
  const value = () => {
    if (val instanceof Array) {
      return val?.map((v: string) => {
        return (
          <Badge mx="1" colorScheme="blue">
            {v}
          </Badge>
        );
      });
    }
    return val;
  };

  return (
    <Flex
      as="dl"
      direction={{ base: 'column', sm: 'row' }}
      px="6"
      py="4"
      _even={{ bg: useColorModeValue('gray.50', 'gray.600') }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...flexProps}
    >
      <Box as="dt" minWidth="180px">
        {label}
      </Box>
      <Box as="dd" flex="1" fontWeight="semibold">
        {value()}
      </Box>
    </Flex>
  );
};

function test() {
  return <ImageUploader />;
}
export const CardHeader: React.FC<HeaderProps> = ({ title, action }) => {
  return (
    <Flex
      align="center"
      justify="space-between"
      px="6"
      py="4"
      borderBottomWidth="1px"
    >
      <Heading as="h2" fontSize="lg">
        {title}
      </Heading>
      {action}
    </Flex>
  );
};

const StudentProfile: React.FC<StudentProfileProps> = ({
  fullname,
  email,
  username,
  school,
  gradeLevel,
  subjects,
  profilePicture,
  onUpdateProfilePicture,
}) => {
  return (
    <Box as="section" py="12" px={{ md: '8' }}>
      <Card maxW="3xl" mx="auto">
        <Stack>
          <CardHeader title="Account Info" />
        </Stack>
        <Box>
          <Property label="Full Name" value={fullname} />
          <Property label="Email" value={email} />
          <Property label="Username" value={username} />
          <Property label="School" value={school} />
          <Property label="Grade Level" value={`Grade ${gradeLevel}`} />
          <Property label="Subjects" value={subjects} />
        </Box>
      </Card>
    </Box>
  );
};
export default StudentProfile;
