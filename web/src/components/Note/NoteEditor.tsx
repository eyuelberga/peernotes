import React, { useState } from 'react';
import Editor from 'rich-markdown-editor';
import {
  Box,
  Input,
  Text,
  Flex,
  Spacer,
  Textarea,
  Stack,
  Button,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TopicSelector from '../lib/TopicSelector';
import { NoteEditorProps } from './props';

const NoteEditor: React.FC<NoteEditorProps> = ({
  content: initialContent,
  title: initialTitle,
  description: initialDescription,
  topic: initialTopic,
  onSave,
  onPublish,
  isLoading,
}) => {
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [topic, setTopic] = useState(initialTopic);
  const validForm = !!(title && content && topic);
  return (
    <Stack>
      <Flex>
        <Spacer />
        {onSave && (
          <Button
            id="NoteEditor_Draft"
            isDisabled={!validForm}
            isLoading={isLoading}
            mr={4}
            leftIcon={<FontAwesomeIcon icon="save" />}
            onClick={() => {
              if (title && topic && content)
                onSave({ title, description, topic, content });
            }}
          >
            Save Draft
          </Button>
        )}
        {onPublish && (
          <Button
            id="NoteEditor_Publish"
            isDisabled={!validForm}
            isLoading={isLoading}
            mr={2}
            colorScheme="blue"
            leftIcon={<FontAwesomeIcon icon="file-upload" />}
            onClick={() => {
              if (title && topic && content)
                onPublish({ title, description, topic, content });
            }}
          >
            Publish
          </Button>
        )}
        {!validForm && (
          <Text style={{ fontSize: '25px' }} px={2} color="red">
            <FontAwesomeIcon icon="exclamation-circle" />
          </Text>
        )}
      </Flex>
      <Stack>
        <Input
          id="NoteEditor_Title"
          size="lg"
          minW="100%"
          placeholder="Note title"
          value={title}
          fontSize="xl"
          fontWeight="semibold"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <Textarea
          id="NoteEditor_Description"
          value={description}
          placeholder="Description for your note"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          noOfLines={2}
        />

        <TopicSelector
          smallFont
          onChange={(newTopic) => {
            setTopic(newTopic);
          }}
          value={topic}
        />
      </Stack>
      <Box
        px={8}
        py={4}
        mt={2}
        minH="80vh"
        borderTopWidth="2px"
        borderLeftWidth="2px"
        borderRightWidth="5px"
        borderColor="gray.100"
        borderTopRadius="lg"
      >
        <Editor
          id="NoteEditor_Editor"
          defaultValue={content}
          placeholder="Write your note here..."
          onChange={(e) => {
            const c = e();
            if (c === '\\\n') {
              setContent('');
            } else {
              setContent(c);
            }
          }}
        />
      </Box>
    </Stack>
  );
};
export default NoteEditor;
