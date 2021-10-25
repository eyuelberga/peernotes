import React from 'react';
import { Story, Meta } from '@storybook/react';
import StudentProfile from '../components/User/StudentProfile';
import { StudentProfileProps } from '../interfaces';

export default {
  title: 'User/StudentProfile',
  component: StudentProfile,
} as Meta;

const Template: Story<StudentProfileProps> = (args) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <StudentProfile {...args} />
);

export const Condensed = Template.bind({});
Condensed.args = {
  username: '@johndoe',
  fullname: 'John Doe',
  email: 'johndoe@ghms.com',
  school: 'gvd secondary school',
  gradeLevel: '10',
  subjects: ['biology'],
};
