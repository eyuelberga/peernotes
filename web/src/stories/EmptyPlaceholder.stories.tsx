/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Story, Meta } from '@storybook/react';

import EmptyPlaceholder from '../components/lib/EmptyPlaceholder';
import { EmptyPlaceholderProps } from '../interfaces';

export default {
  title: 'Lib/EmptyPlaceholder',
  component: EmptyPlaceholder,
} as Meta;

const Template: Story<EmptyPlaceholderProps> = (args) => (
  <EmptyPlaceholder {...args} />
);

export const Default = Template.bind({});
Default.args = {
  icon: 'file',
  title: 'No Notes',
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  ...Default.args,
  description:
    'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};
