/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Story, Meta } from '@storybook/react';
import { FcReading, FcConferenceCall, FcCollaboration } from 'react-icons/fc';
import { FeaturesProps } from '../interfaces';
import Features from '../components/Home/Features';

export default {
  title: 'Home/Features',
  component: Features,
} as Meta;

const Template: Story<FeaturesProps> = (args) => <Features {...args} />;

export const Default = Template.bind({});
Default.args = {
  features: [
    {
      icon: <FcReading />,
      title: 'Share Textbook notes',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...',
    },
    {
      icon: <FcConferenceCall />,
      title: 'Cooperative Learning',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...',
    },
    {
      icon: <FcCollaboration />,
      title: 'Peer Tutoring',
      description:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...',
    },
  ],
};
