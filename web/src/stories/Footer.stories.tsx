/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Story, Meta } from '@storybook/react';

import Footer from '../components/Home/Footer';

export default {
  title: 'Home/Footer',
  component: Footer,
} as Meta;

const Template: Story = (args) => <Footer {...args} />;

export const Default = Template.bind({});
