import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  Select,
  Textarea,
  Button,
  Stack,
} from '@chakra-ui/react';
import { loader } from 'graphql.macro';
import { useMutation } from '@apollo/client';
import { NoteReportProps } from './props';
import { REPORTS } from '../../config/constants';
import { toastifyError, toastifySuccess } from '../../utils';

const REPORT_NOTE = loader('../../queries/notes/report.gql');

const NoteReport: React.FC<NoteReportProps> = ({
  id,
  isOpen,
  onClose,
  onOpen,
}) => {
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const validForm = !!(type && description);

  const [report, { loading }] = useMutation(REPORT_NOTE, {
    onError: (e) => {
      toastifyError(e);
    },
    onCompleted: () => {
      onClose();
      toastifySuccess({
        title: 'Note Reported',
        description: 'Thank you! Your report has been recieved',
      });
    },
  });
  const submitReport = () => {
    report({ variables: { id, type, description } });
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      id="NoteReport_Modal"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Report Note</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <Select
              id="NoteReport_Type"
              value={type}
              placeholder="Report Type"
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              {REPORTS.map((s) => (
                <option key={s} value={s} style={{ fontWeight: 'bold' }}>
                  {s}
                </option>
              ))}
            </Select>
            <Textarea
              id="NoteReport_Description"
              value={description}
              placeholder="Write a detailed description for your report"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Stack direction="row">
            <Button onClick={onClose}>Cancel</Button>
            <Button
              id="NoteReport_Submit"
              onClick={submitReport}
              colorScheme="blue"
              isDisabled={!validForm}
            >
              Submit
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default NoteReport;
