import React from 'react';
import { Meta } from '@storybook/react';

import NoteEditorSkeleton from '../components/Note/NoteEditorSkeleton';

export default {
  title: 'Note/NoteEditorSkeleton',
  component: NoteEditorSkeleton,
} as Meta;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Template = () => <NoteEditorSkeleton />;
