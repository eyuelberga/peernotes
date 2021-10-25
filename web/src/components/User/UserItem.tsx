import React from 'react';
import {
  Avatar,
  Box,
  Text,
  Stack,
  IconButton,
  Tag,
  Flex,
  Spacer,
  Wrap,
  Link as CLink,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserItemProps } from './props';
import { USER_PATH, DETAIL } from '../../config/constants';

const UserItem: React.FC<UserItemProps> = ({
  fullname,
  username,
  profilePicture,
  gradeLevel,
  school,
  onAccept,
  onReject,
  onSendRequest,
  link,
  smallFont,
  action: Action,
}) => {
  const UserBody = (
    <Box rounded="lg" borderWidth="1px" borderRadius="lg" p={smallFont ? 2 : 4}>
      <Flex>
        <Avatar
          size={smallFont ? 'sm' : 'md'}
          src={profilePicture}
          name={fullname}
          alt="Author"
        />
        <Stack
          direction="column"
          spacing={0}
          fontSize={smallFont ? 'xs' : 'sm'}
          mx={2}
        >
          <Wrap>
            <CLink>
              <Link to={`${USER_PATH}/${DETAIL}/${username}`}>
                <Text noOfLines={1} fontWeight={600}>
                  {fullname}
                </Text>
              </Link>
            </CLink>

            {gradeLevel && (
              <Tag size="sm" variant="outline" colorScheme="blue">
                {`Grade ${gradeLevel}`}
              </Tag>
            )}
          </Wrap>

          {school && (
            <Text noOfLines={1} color="gray.500">
              {school}
            </Text>
          )}
        </Stack>
        <Spacer />
        <Stack direction="row">
          {onReject && (
            <IconButton
              id="UserItem_Reject"
              rounded="lg"
              aria-label="reject"
              onClick={onReject}
              icon={<FontAwesomeIcon icon="ban" />}
            />
          )}
          {onAccept && (
            <IconButton
              id="UserItem_Accept"
              rounded="lg"
              colorScheme="blue"
              aria-label="connect"
              onClick={onAccept}
              icon={<FontAwesomeIcon icon="plus" />}
            />
          )}
          {onSendRequest && (
            <IconButton
              id="UserItem_SendRequest"
              rounded="lg"
              aria-label="connect"
              onClick={onSendRequest}
              icon={<FontAwesomeIcon icon="paper-plane" />}
            />
          )}
          {Action}
        </Stack>
      </Flex>
    </Box>
  );
  return <>{link ? <Link to={link}>{UserBody}</Link> : UserBody}</>;
};
export default UserItem;
