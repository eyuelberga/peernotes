/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Story, Meta } from '@storybook/react';

import AlertWrapper from '../components/lib/AlertWrapper';
import { AlertProps } from '../interfaces';

export default {
  title: 'Lib/AlertWrapper',
  component: AlertWrapper,
} as Meta;

const Template: Story<AlertProps> = (args) => <AlertWrapper {...args} />;

export const Error = Template.bind({});
Error.args = {
  title: 'Error has happened',
  status: 'error',
};
export const ErrorWithDescription = Template.bind({});
ErrorWithDescription.args = {
  ...Error.args,
  description:
    'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};

export const Warning = Template.bind({});
Warning.args = {
  title: 'This is a warning',
  status: 'warning',
};
export const WarningWithDescription = Template.bind({});
WarningWithDescription.args = {
  ...Warning.args,
  description:
    'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};
export const Success = Template.bind({});
Success.args = {
  title: 'Yay! that worked',
  status: 'success',
};
export const SuccessWithDescription = Template.bind({});
SuccessWithDescription.args = {
  ...Success.args,
  description:
    'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};
