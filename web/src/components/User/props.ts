import {
  ListProps,
  BasicStudentInfo,
  Linkable,
  ExtendedDisplayProps,
  Extendable,
  Loadable,
} from '../interfaces';

export interface UserProfileCardProps
  extends BasicStudentInfo,
    Linkable,
    Loadable,
    Pick<Extendable, 'action'> {
  bio?: string;
  subjects?: string[];
  onAccept?: () => void;
}

export interface UserItemProps
  extends BasicStudentInfo,
    Linkable,
    Pick<ExtendedDisplayProps, 'smallFont'>,
    Pick<Extendable, 'action'> {
  id?: string;
  onAccept?: () => void;
  onReject?: () => void;
  onSendRequest?: () => void;
}

export interface UserListProps
  extends ListProps<UserItemProps>,
    Pick<ExtendedDisplayProps, 'smallFont'> {
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onSendRequest?: (username: string) => void;
}

export interface GetStarted {
  school: string;
  gradeLevel: number;
  fullname: string;
  subjects: string[];
}
export interface GetStartedFormProps extends Loadable {
  school?: string;
  studentId?: string;
  gradeLevel?: number;
  picture1?: string;
  picture2?: string;
  fullname?: string;
  subjects?: string[];
  onSave?: (newValue: GetStarted) => void;
}
export interface GetStartedDisplayProps extends GetStarted, Loadable {
  username: string;
  onAccept?: () => void;
  onReject?: () => void;
}

export interface GetStartedPayload {
  username: string;
  school: string;
  gradeLevel: number;
  fullname: string;
}

export interface GetStartedListProps
  extends ListProps<GetStartedDisplayProps>,
    Pick<ExtendedDisplayProps, 'smallFont'> {
  onAccept?: (payload: GetStartedPayload) => void;
  onReject?: (payload: GetStartedPayload) => void;
}

export interface StudentProfileProps {
  fullname: string;
  email: string;
  username: string;
  school: string;
  gradeLevel: string;
  subjects: string[];
  profilePicture: string;
  onUpdateProfilePicture: (url: string) => void;
}
export interface NotificationDisplayProps {
  id: string;
  subject: string;
  body?: string;
  to?: string;
  seen?: boolean;
  updatedAt: string;
  onRead?: () => void;
}
export interface NotificationListProps
  extends ListProps<NotificationDisplayProps>,
    ExtendedDisplayProps {
  onRead?: (id: string) => void;
}

export interface SchoolSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onSelect: (school: string) => void;
}
