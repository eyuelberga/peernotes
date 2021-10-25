import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  Button,
} from '@chakra-ui/react';
import { SchoolSelectorProps } from './props';
import SchoolFetch from '../lib/async/SchoolFetch';

const SchoolSelector: React.FC<SchoolSelectorProps> = ({
  isOpen,
  onClose,
  onOpen,
  onSelect,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      id="SchoolSelector_Modal"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select School</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SchoolFetch
            onSelect={({ name }) => {
              onSelect(name);
              onClose();
            }}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              onSelect('NOT LISTED');
              onClose();
            }}
          >
            My School is not Listed
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default SchoolSelector;
