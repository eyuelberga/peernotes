import { createStandaloneToast, UseToastOptions } from '@chakra-ui/react';
import { ApolloError } from '@apollo/client';
import { AlertProps } from '../interfaces';

const resolveError: (error: ApolloError) => AlertProps = (error) => {
  if (error.networkError) {
    return {
      title: 'No Internet connection',
      description: 'Check your internet connection',
      status: 'error',
    };
  }
  if (error.graphQLErrors) {
    if (process.env.NODE_ENV === 'development') {
      return {
        title: 'Dev Errors',
        description: `${JSON.stringify(error.graphQLErrors)}`,
        status: 'error',
      };
    }
  }

  if (process.env.NODE_ENV === 'development') {
    return {
      title: 'Dev Errors',
      description: `${JSON.stringify(error)}`,
      status: 'error',
    };
  }

  return {
    title: 'Technical Error',
    description: 'Something went wrong. Please contact support',
    status: 'error',
  };
};

export const toastMessage: (message: UseToastOptions) => void = (message) => {
  const toast = createStandaloneToast();
  toast(message);
};

export const toastifyError: (error: ApolloError) => void = (error) => {
  const err = resolveError(error);
  toastMessage({
    ...err,
    position: 'top-right',
    duration: process.env.NODE_ENV === 'development' ? null : 3000,
    isClosable: true,
  });
};

interface ToastMessage {
  title: string;
  description?: string;
}

export const toastifyErrorCustom: (message: ToastMessage) => void = ({
  title,
  description,
}) => {
  toastMessage({
    title,
    description,
    position: 'top-right',
    status: 'error',
    duration: process.env.NODE_ENV === 'development' ? null : 3000,
    isClosable: true,
  });
};

export const toastifySuccess: (message: ToastMessage) => void = ({
  title,
  description,
}) => {
  toastMessage({
    title,
    description,
    position: 'top-right',
    status: 'success',
    duration: 3000,
    isClosable: true,
  });
};

export const alert: (error?: ApolloError) => AlertProps | undefined = (
  error,
) => {
  if (error) {
    return resolveError(error);
  }
  return undefined;
};

export const toBase64: (obj: Record<string, string | number>) => string = (
  object,
) => {
  return window.btoa(JSON.stringify(object));
};

export const toObject: (base64: string) => Record<string, any> = (base64) => {
  const str = window.atob(base64);
  return JSON.parse(str);
};
