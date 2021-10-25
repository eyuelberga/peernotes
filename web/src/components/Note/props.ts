import {
  ListProps,
  TopicValue,
  ManagementActions,
  BasicDisplayInfo,
  Linkable,
  Loadable,
  ExtendedDisplayProps,
  TopicInfo,
} from '../interfaces';

export interface NoteDisplayProps
  extends ManagementActions,
    BasicDisplayInfo,
    Linkable,
    Loadable,
    ExtendedDisplayProps,
    TopicInfo {
  likes?: number;
  views?: number;
  content?: string;
  onLike?: () => void;
  onBookmark?: () => void;
  onReport?: () => void;
  isLiked?: boolean;
  isBookmarked?: boolean;
  label?: string;
}

export interface NoteReportValue {
  type: string;
  description: string;
}
export interface NoteReportDisplayProps extends NoteDisplayProps {
  onAccept?: () => void;
  onReject?: () => void;
  report: NoteReportValue;
  username: string;
}

export interface Note {
  title: string;
  description?: string;
  topic: TopicValue;
  content: string;
}

export interface NoteEditorProps extends Loadable {
  title?: string;
  description?: string;
  topic?: TopicValue;
  content?: string;
  onSave?: (newValue: Note) => void;
  onPublish?: (newValue: Note) => void;
}

export interface NoteFooterProps {}

export interface NoteDisplaySkeletonProps {
  isDetailed?: boolean;
}
export interface NoteListProps
  extends ListProps<NoteDisplayProps>,
    ExtendedDisplayProps {}

export interface NoteReportListProps
  extends ListProps<NoteReportDisplayProps>,
    ExtendedDisplayProps {
  onAccept?: (id: string, username: string) => void;
  onReject?: (id: string, username: string) => void;
}

export interface NoteReportProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}
