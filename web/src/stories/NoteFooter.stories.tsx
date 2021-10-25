/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Story, Meta } from '@storybook/react';
import NoteFooter from '../components/Note/NoteFooter';
import { NoteFooterProps } from '../interfaces';

export default {
  title: 'Note/NoteFooter',
  component: NoteFooter,
} as Meta;

const Template: Story<NoteFooterProps> = (args) => <NoteFooter {...args} />;

export const Default = Template.bind({});
Default.args = {};
