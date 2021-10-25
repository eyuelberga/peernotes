import React from 'react';
import { Link } from 'react-router-dom';
import Editor from 'rich-markdown-editor';
import {
  Box,
  Text,
  Flex,
  Spacer,
  Divider,
  IconButton,
  Avatar,
  Heading,
  Tag,
  Stack,
  Wrap,
  Link as CLink,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NoteDisplayProps } from './props';
import NoteFooter from './NoteFooter';
import { USER_PATH, DETAIL } from '../../config/constants';

const NoteDisplay: React.FC<NoteDisplayProps> = ({
  title,
  content,
  updatedAt,
  topic,
  createdBy,
  onLike,
  onBookmark,
  onPreview,
  onRemove,
  onReport,
  onEdit,
  isLiked,
  isBookmarked,
  isLoading,
  description,
  subject,
  link,
  likes,
  gradeLevel,
  views,
  hideUserInfo,
  label,
  smallFont,
}) => {
  const NoteStats = (
    <>
      {`    ${new Date(updatedAt).toDateString()}    `}
      {likes !== undefined && (
        <>
          <FontAwesomeIcon icon={['far', 'thumbs-up']} />
          {`    ${likes}    `}
        </>
      )}
      {views !== undefined && (
        <>
          <FontAwesomeIcon icon={['far', 'eye']} />
          {`    ${views}    `}
        </>
      )}
    </>
  );
  const iconSize = content ? 'lg' : 'md';
  const tagSize = !smallFont ? 'md' : 'sm';
  const titleSize = !smallFont ? 'lg' : 'sm';
  const NoteBody = (
    <Box p={4} borderWidth="1px" borderRadius="lg" role="article">
      {label && (
        <Flex>
          <Spacer />
          <Tag size="lg" variant="subtle">
            {label}
          </Tag>
        </Flex>
      )}
      <Flex>
        <Box>
          <Heading size={titleSize} noOfLines={content ? undefined : 1}>
            {title}
          </Heading>
          {description && (
            <Text
              color="gray.500"
              noOfLines={content ? undefined : 2}
              fontSize={tagSize}
            >
              {description}
            </Text>
          )}
          <Wrap mt={smallFont ? 2 : 4}>
            {gradeLevel && (
              <Tag size={tagSize} variant="subtle" colorScheme="green">
                {`Grade ${gradeLevel}`}
              </Tag>
            )}
            {subject && (
              <Tag size={tagSize} variant="subtle" colorScheme="orange">
                {subject}
              </Tag>
            )}
            {topic && (
              <Tag size={tagSize} variant="subtle" colorScheme="blue">
                {topic}
              </Tag>
            )}
          </Wrap>

          {!hideUserInfo && (
            <Stack
              mt={smallFont ? 2 : 6}
              direction="row"
              spacing={4}
              align="center"
            >
              <Avatar
                size={tagSize}
                src={createdBy.profilePicture}
                name={createdBy.fullname}
                alt="Author"
              />
              <Stack
                direction="column"
                spacing={0}
                fontSize={!smallFont ? 'sm' : 'xs'}
              >
                <CLink>
                  <Link to={`${USER_PATH}/${DETAIL}/${createdBy.username}`}>
                    <Text noOfLines={1} fontWeight={600}>
                      {createdBy.fullname}
                    </Text>
                  </Link>
                </CLink>
                <Text noOfLines={content ? undefined : 1} color="gray.500">
                  {NoteStats}
                </Text>
              </Stack>
            </Stack>
          )}
        </Box>
      </Flex>

      {content && (
        <>
          <Divider my={2} />
          <Box px={2}>
            <Editor defaultValue={content} readOnly onChange={() => {}} />

            {(onLike || onBookmark) && <NoteFooter />}
          </Box>
        </>
      )}

      <Flex alignItems="baseline" px={2}>
        <Box>
          {onLike && (
            <IconButton
              id="NoteDisplay_Like"
              ml={1}
              colorScheme="blue"
              aria-label="like"
              variant="ghost"
              size={iconSize}
              isDisabled={isLoading}
              onClick={onLike}
              icon={
                <FontAwesomeIcon
                  icon={[`fa${isLiked ? 's' : 'r'}` as any, 'thumbs-up']}
                />
              }
            />
          )}
          {onBookmark && (
            <IconButton
              id="NoteDisplay_Bookmark"
              ml={1}
              colorScheme="gray"
              aria-label="edit"
              variant="ghost"
              size={iconSize}
              isDisabled={isLoading}
              onClick={onBookmark}
              icon={
                <FontAwesomeIcon
                  icon={[`fa${isBookmarked ? 's' : 'r'}` as any, 'bookmark']}
                />
              }
            />
          )}
        </Box>
        <Spacer />
        <Box p={1} rounded="10px" bg="gray.50">
          {onEdit && (
            <IconButton
              id="NoteDisplay_Edit"
              ml={1}
              colorScheme="blue"
              aria-label="edit"
              variant="ghost"
              size={iconSize}
              isDisabled={isLoading}
              onClick={onEdit}
              icon={<FontAwesomeIcon icon="edit" />}
            />
          )}
          {onRemove && (
            <IconButton
              id="NoteDisplay_Remove"
              ml={1}
              colorScheme="red"
              aria-label="remove"
              variant="ghost"
              size={iconSize}
              isDisabled={isLoading}
              onClick={onRemove}
              icon={<FontAwesomeIcon icon="trash-alt" />}
            />
          )}
        </Box>
        <Box>
          {onReport && (
            <IconButton
              id="NoteDisplay_Report"
              ml={1}
              colorScheme="red"
              aria-label="edit"
              variant="ghost"
              size={iconSize}
              isDisabled={isLoading}
              onClick={onReport}
              icon={<FontAwesomeIcon icon={['fas', 'exclamation-circle']} />}
            />
          )}
          {onPreview && (
            <IconButton
              id="NoteDisplay_Preview"
              ml={1}
              colorScheme="blue"
              aria-label="preview"
              variant="ghost"
              size={iconSize}
              isDisabled={isLoading}
              onClick={onPreview}
              icon={<FontAwesomeIcon icon="external-link-alt" />}
            />
          )}
        </Box>
      </Flex>
    </Box>
  );
  return <>{link ? <Link to={link}>{NoteBody}</Link> : NoteBody}</>;
};
export default NoteDisplay;
