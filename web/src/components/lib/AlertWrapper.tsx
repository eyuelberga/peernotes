import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { AlertProps } from './props';

const AlertWrapper: React.FC<AlertProps> = ({ title, description, status }) => {
  return (
    <Alert
      status={status}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} fontSize="lg" mb={1}>
        {title}
      </AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};
export default AlertWrapper;
