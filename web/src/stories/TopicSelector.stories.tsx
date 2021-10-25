/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Story, Meta } from '@storybook/react';

import TopicSelector from '../components/lib/TopicSelector';

export default {
  title: 'Lib/TopicSelector',
  component: TopicSelector,
} as Meta;

const Template: Story = (args) => <TopicSelector {...args} />;

export const Default = Template.bind({});
