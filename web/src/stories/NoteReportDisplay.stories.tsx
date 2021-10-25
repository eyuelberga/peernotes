/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Story, Meta } from '@storybook/react';

import NoteReportDisplay from '../components/Note/NoteReportDisplay';
import { NoteReportDisplayProps } from '../interfaces';
import { noteContent as content, note1 } from './note';

export default {
  title: 'Note/NoteReportDisplay',
  component: NoteReportDisplay,
} as Meta;

const Template: Story<NoteReportDisplayProps> = (args) => (
  <NoteReportDisplay {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Notes on the laws of newton',
  topic: 'Netwon laws of physics',
  createdBy: note1.createdBy,
  subject: 'Physics',
  gradeLevel: 'Grade 12',
  likes: 10000,
  views: 12000,
  updatedAt: 'April 20, 2021',
  onReject: () => {},
  onAccept: () => {},
  report: {
    type: 'COPYRIGHT',
    description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed',
  },
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  ...Default.args,
  description:
    'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
};
export const WithContentAndActions = Template.bind({});
WithContentAndActions.args = {
  ...Default.args,
  content,
  onLike: () => {},
  onBookmark: () => {},
};

export const Management = Template.bind({});
Management.args = {
  ...Default.args,
  onRemove: () => {},
  onEdit: () => {},
  onPreview: () => {},
};
