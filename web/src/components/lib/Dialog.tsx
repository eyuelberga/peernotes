import React from 'react';
import { AlertDialog, AlertDialogOverlay } from '@chakra-ui/react';
import { DialogProps } from './props';

const Dialog: React.FC<DialogProps> = ({
  children,
  isOpen,
  cancelRef,
  onClose,
}) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>{children}</AlertDialogOverlay>
    </AlertDialog>
  );
};
export default Dialog;
