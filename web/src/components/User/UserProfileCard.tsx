import React from 'react';
import {
  Heading,
  Avatar,
  Box,
  Text,
  Stack,
  Button,
  SimpleGrid,
  Tag,
  Badge,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserProfileCardProps } from '../../interfaces';

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  username,
  fullname,
  bio,
  subjects,
  profilePicture,
  gradeLevel,
  onAccept,
  school,
  isLoading,
}) => {
  return (
    <Box w="full" rounded="lg" borderWidth="1px" borderRadius="lg" p={4}>
      <Stack direction="row" spacing={4} align="center">
        <Avatar
          size="2xl"
          src={profilePicture}
          alt={fullname}
          name={fullname}
          mb={4}
          pos="relative"
        />
        <Stack direction="column" spacing={0}>
          <Heading fontSize="xl" fontFamily="body" mb={2}>
            {fullname}
            <Text fontWeight={600} color="gray.500" mb={1} fontSize="sm">
              {`@${username}`}
            </Text>
          </Heading>
          <Stack direction="row" spacing={1}>
            {gradeLevel && (
              <Tag colorScheme="green">{`Grade ${gradeLevel}`}</Tag>
            )}
            {school && <Tag colorScheme="blue">{school}</Tag>}
          </Stack>
          {bio && (
            <Text color="gray.700" my={2}>
              {bio}
            </Text>
          )}
        </Stack>
      </Stack>
      <SimpleGrid spacing={2} columns={{ base: 1, md: 2 }}>
        {subjects && subjects.length > 0 && (
          <Box>
            <Text fontWeight="bold">Subjects</Text>
            <SimpleGrid minChildWidth="100px" spacing={2} mt={4}>
              {subjects.map((subject) => (
                <Badge
                  key={subject}
                  px={2}
                  py={1}
                  bg="gray.100"
                  fontWeight="400"
                >
                  {subject}
                </Badge>
              ))}
            </SimpleGrid>
          </Box>
        )}
      </SimpleGrid>

      <Stack mt={8} direction="row" spacing={4} align="bottom">
        {onAccept && (
          <>
            <Button
              isLoading={isLoading}
              flex={1}
              rounded="2xl"
              boxShadow="0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              colorScheme="blue"
              fontSize="sm"
              leftIcon={<FontAwesomeIcon icon="plus" />}
              onClick={onAccept}
            >
              Send Connection Request
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
};
export default UserProfileCard;
