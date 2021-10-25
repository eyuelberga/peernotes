/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Story, Meta } from '@storybook/react';
import NoteEditor from '../components/Note/NoteEditor';
import { NoteEditorProps } from '../interfaces';

export default {
  title: 'Note/NoteEditor',
  component: NoteEditor,
} as Meta;

const Template: Story<NoteEditorProps> = (args) => <NoteEditor {...args} />;

export const Default = Template.bind({});
Default.args = {};
