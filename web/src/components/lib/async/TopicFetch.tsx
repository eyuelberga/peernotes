import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  Skeleton,
  ModalBody,
  Select,
  Button,
  Stack,
} from '@chakra-ui/react';
import { loader } from 'graphql.macro';
import { useLazyQuery } from '@apollo/client';
import { TopicFetchProps, GradeSubjects } from '../props';
import { Option } from '../../interfaces';
import { SUBJECTS } from '../../../config/constants';
import { toastifyError } from '../../../utils';

const GET_TOPICS = loader('../../../queries/topics/get.gql');

export const toOptions: (
  arr: (string | number)[],
  disabled: boolean,
) => { value: string | number; name: string | number; disabled: boolean }[] = (
  arr,
  disabled = false,
) => {
  return arr.map((el) => {
    return { value: el, name: el, disabled };
  });
};
const isGradeDisabled: (subjects: Option[]) => boolean = (subjects) => {
  return subjects
    .map(({ disabled }) => {
      return disabled;
    })
    .reduce((prev, current) => {
      return prev && current;
    }, true);
};
const allSubjects = toOptions(SUBJECTS, false);
export const defaultGradeSubjects: GradeSubjects = {
  '9': allSubjects,
  '10': allSubjects,
  '11': allSubjects,
  '12': allSubjects,
};

const TopicFetch: React.FC<TopicFetchProps> = ({
  value: initialValue,
  onSelect,
  isOpen: shouldOpenModal,
  onClose: onCloseCallback,
  gradeSubjects: gS,
}) => {
  const gradeSubjects: GradeSubjects = gS || defaultGradeSubjects;
  const keys = Object.keys(gradeSubjects);
  const grades: Option[] = keys.map((el) => {
    const disabled = !(gradeSubjects[el].length > 0);
    return { value: el, name: el, disabled };
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [subject, setSubject] = useState(initialValue?.subject || '');
  const [gradeLevel, setGradeLevel] = useState(initialValue?.gradeLevel || '');
  const [topic, setTopic] = useState(initialValue?.topic || '');
  const [id, setId] = useState(initialValue?.id || '');
  const [topics, setTopics] = useState<any[]>([]);

  // TODO remove idTopic field if there is a better way of passing two values
  // to a select input
  const initialIdTopic =
    initialValue?.id && initialValue?.topic
      ? `${initialValue.id}\t${initialValue.topic}`
      : '';
  const [idTopic, setIdTopic] = useState(initialIdTopic);
  const validForm = !!(subject && gradeLevel && topic && id);
  const [fetch, { loading }] = useLazyQuery(GET_TOPICS, {
    onError: (e) => {
      toastifyError(e);
    },
    onCompleted: ({ topics: ts }) => {
      setTopics(
        (ts as any[]).map(({ id: tId, topic: t, textbook }) => {
          return {
            id: tId,
            topic: t,
            subject: textbook.subject,
            gradeLevel: textbook.gradeLevel,
          };
        }),
      );
      setTopic('');
      setId('');
      setIdTopic('');
    },
  });

  useEffect(() => {
    if (shouldOpenModal) onOpen();
  }, [shouldOpenModal, onOpen]);

  useEffect(() => {
    setSubject(initialValue?.subject || '');
    setGradeLevel(initialValue?.gradeLevel || '');
    setTopic(initialValue?.topic || '');
    setId(initialValue?.id || '');
  }, [initialValue]);

  const onSelectInternal = () => {
    onSelect({ id, subject, gradeLevel, topic });
    onClose();
  };
  const onCloseInternal = () => {
    onClose();
    if (onCloseCallback) {
      onCloseCallback();
    }
  };
  const fetchTopic = (gL: string, subj: string) => {
    if (gL && subj) {
      fetch({ variables: { gradeLevel: gL, subject: subj } });
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseInternal}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Pick a Topic</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <Select
              id="TopicFetch_Grade"
              value={gradeLevel}
              placeholder="Grade Level"
              onChange={(e) => {
                setGradeLevel(e.target.value);
                fetchTopic(e.target.value, subject);
              }}
            >
              {grades.map(({ name, value }) => (
                <option
                  disabled={isGradeDisabled(gradeSubjects[value])}
                  key={value}
                  value={value}
                  style={{ fontWeight: 'bold' }}
                >
                  {`Grade ${name}`}
                </option>
              ))}
            </Select>
            <Select
              id="TopicFetch_Subject"
              value={subject}
              isDisabled={!gradeLevel}
              placeholder="Subject"
              onChange={(e) => {
                setSubject(e.target.value);
                fetchTopic(gradeLevel, e.target.value);
              }}
            >
              {gradeLevel &&
                gradeSubjects[gradeLevel] &&
                gradeSubjects[gradeLevel].map(({ name, value, disabled }) => (
                  <option
                    disabled={disabled}
                    key={value}
                    value={value}
                    style={{ fontWeight: 'bold' }}
                  >
                    {name}
                  </option>
                ))}
            </Select>

            {loading ? (
              <Skeleton w="full" h={10} id="TopicFetch_Skeleton" />
            ) : (
              <Select
                id="TopicFetch_Topic"
                isDisabled={!subject || !gradeLevel}
                value={idTopic}
                variant="filled"
                placeholder="Topic"
                onChange={(e) => {
                  setIdTopic(e.target.value);
                  const [targetId, targetName] = e.target.value.split('\t');
                  setTopic(targetName);
                  setId(targetId);
                }}
              >
                {topics.map(({ id: i, topic: name }) => (
                  <option
                    key={`${i}\t${name}`}
                    value={`${i}\t${name}`}
                    style={{ fontWeight: 'bold' }}
                  >
                    {name}
                  </option>
                ))}
              </Select>
            )}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Stack direction="row">
            <Button id="TopicFetch_Cancel" onClick={onCloseInternal}>
              Cancel
            </Button>
            <Button
              id="TopicFetch_Select"
              colorScheme="blue"
              onClick={onSelectInternal}
              isDisabled={!validForm}
            >
              Select
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default TopicFetch;
