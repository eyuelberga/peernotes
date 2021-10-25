/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Story, Meta } from '@storybook/react';
import UserProfileCard from '../components/User/UserProfileCard';
import { UserProfileCardProps } from '../interfaces';

export default {
  title: 'User/UserProfileCard',
  component: UserProfileCard,
} as Meta;

const Template: Story<UserProfileCardProps> = (args) => (
  <UserProfileCard {...args} />
);

export const Condensed = Template.bind({});
Condensed.args = {
  username: 'johndoe',
  fullname: 'John Doe',
};
export const Full = Template.bind({});
Full.args = {
  username: 'johndoe',
  fullname: 'John Doe',
  bio:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  subjects: ['Chemistry', 'Biology', 'Physics'],
  profilePicture:
    'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ',
  gradeLevel: 'Senior',
};
export const WithNavigation = Template.bind({});
WithNavigation.args = {
  username: 'johndoe',
  fullname: 'John Doe',
  gradeLevel: 'Junior',
  onAccept: () => {},
};
