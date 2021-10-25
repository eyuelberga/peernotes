/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Story, Meta } from '@storybook/react';

import Hero from '../components/Home/Hero';
import { HeroProps } from '../interfaces';

export default {
  title: 'Home/Hero',
  component: Hero,
} as Meta;

const Template: Story<HeroProps> = (args) => <Hero {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'Peer Learn',
  subtitle: 'a peer learning social network',
  description: `CPLP is a cloud-based peer learning platform for High School
    students. Join a growing community of students, share textbook
    notes, participate in a cooperaive learning, peer tutoring sessions
    online. And it is all free!`,
  image:
    'https://images.unsplash.com/photo-1610500796385-3ffc1ae2f046?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
};

export const WithActions = Template.bind({});
WithActions.args = {
  ...Default.args,
  onGetStarted: () => {},
  onHowItWorks: () => {},
};
