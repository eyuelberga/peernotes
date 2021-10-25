import React from 'react';
import Alert from './AlertWrapper';
import { AlertProps } from './props';

const AsyncRender: React.FC<{
  skeleton: React.ReactNode;
  fallback: React.ReactNode;
  data?: any;
  loading?: boolean;
  alert?: AlertProps;
}> = ({ skeleton, fallback, data, loading, alert }) => {
  return (
    <>
      {loading && skeleton}
      {alert && (
        <Alert
          title={alert.title}
          description={alert.description}
          status={alert.status}
        />
      )}
      {!loading && data}
      {!data && !loading && !alert && fallback}
    </>
  );
};

export default AsyncRender;
