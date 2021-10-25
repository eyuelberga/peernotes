import { RefObject } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  TopicValue,
  BasicStudentInfo,
  ExtendedDisplayProps,
  Extendable,
  Option,
} from '../interfaces';

export interface AccountMenuProps {
  minimal?: boolean;
}
export interface LayoutProps {
  children: any;
}
export interface AlertProps {
  title: string;
  description?: string;
  status: 'error' | 'warning' | 'success' | 'info';
}

export interface EmptyPlaceholderProps {
  icon: IconProp;
  title: string;
  description?: string;
}

export interface TopicSelectorProps
  extends Pick<ExtendedDisplayProps, 'smallFont'> {
  value?: TopicValue;
  isInvalid?: boolean;
  onChange?: (newValue: TopicValue) => void;
  disabled?: boolean;
  gradeSubjects?: GradeSubjects;
}
export type GradeSubjects = Record<string, Option[]>;
export interface TopicFetchProps {
  value?: TopicValue;
  onSelect: (value: TopicValue) => void;
  isOpen?: boolean;
  onClose?: () => void;
  gradeSubjects?: GradeSubjects;
}

export interface SubNavigationProps extends Pick<Extendable, 'action'> {
  title?: string;
  description?: string;
  goBack?: boolean;
}

export interface ListHeaderProps {
  title: string;
  linkName?: string;
  linkPath?: string;
}

export interface DialogContentProps {
  cancelRef: RefObject<HTMLButtonElement>;
  onClose: () => void;
}
export interface DialogProps extends DialogContentProps {
  isOpen: boolean;
}

export interface DeleteDialogProps {
  callback: (id: string) => void;
  id: string;
  name?: string;
  isLoading?: boolean;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export interface MenuAction {
  to: string;
  name: string;
  icon?: IconProp;
}
export type NavActions = (MenuAction | 'divider')[];

export interface NavMenuProps {
  actions: NavActions;
}

export interface StudentFetchProps {
  fromConnectionOnly?: boolean;
  isDisabled?: boolean;
  onSelect?: (student: BasicStudentInfo) => void;
}
export interface StudentFetchByIDProps {
  isDisabled?: boolean;
  onSelect?: (student: BasicStudentInfo) => void;
}
export interface BasicSchoolInfo {
  name: string;
  picture?: string;
  location?: string;
}
export interface SchoolFetchProps {
  isDisabled?: boolean;
  onSelect?: (school: BasicSchoolInfo) => void;
}

export interface ImageUploaderProps {
  maxFiles?: number;
  onUpload?: (images: string[]) => void;
}

export interface StatsCardProps {
  title: string;
  stat?: string | number;
  icon?: IconProp;
  description?: string;
  onAction?: () => void;
}

export interface SchoolItemProps
  extends BasicSchoolInfo,
    Pick<ExtendedDisplayProps, 'smallFont'>,
    Pick<Extendable, 'action'> {
  onSelect?: () => void;
}
