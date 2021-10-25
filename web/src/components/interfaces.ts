import { ReactNode } from 'react';
import { ApolloError } from '@apollo/client';

export interface Extendable {
  action?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
}

export interface BasicStudentInfo {
  username: string;
  fullname: string;
  school?: string;
  profilePicture?: string;
  gradeLevel?: string;
}
export interface ListProps<T> extends Exclude<Extendable, 'action'> {
  loading: boolean;
  data?: T[];
  error?: ApolloError;
  from?: string;
  hideDetails?: boolean;
  isEditable?: boolean;
  isPreview?: boolean;
  onRemove?: (id: string) => void;
}

export interface TopicValue {
  id: string;
  subject: string;
  gradeLevel: string;
  topic: string;
}

export interface ManagementActions {
  onEdit?: () => void;
  onRemove?: () => void;
  onPreview?: () => void;
}

export interface BasicDisplayInfo {
  id: string;
  title: string;
  description?: string;
  updatedAt: string;
  createdBy: BasicStudentInfo;
}

export interface TopicInfo {
  topic?: string;
  subject?: string;
  gradeLevel?: string;
}

export interface ExtendedDisplayProps {
  hideUserInfo?: boolean;
  smallFont?: boolean;
  isDisabled?: boolean;
}

export interface Linkable {
  link?: string;
}

export interface Loadable {
  isLoading?: boolean;
}

export interface TaskInfo {
  title: string;
  completed?: boolean;
}

export interface Option {
  name: string | number;
  value: string | number;
  disabled: boolean;
}
