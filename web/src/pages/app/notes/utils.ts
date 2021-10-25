export const mapNotesRequest = ({
  id,
  createdBy,
  title,
  description,
  updatedAt,
  views,
  likes,
  topic: topicObj,
}: any) => {
  const { name: topic, textbook } = topicObj;
  const { subject, gradeLevel } = textbook;
  return {
    id,
    title,
    topic,
    subject,
    gradeLevel,
    updatedAt,
    likes: likes.aggregate.count,
    views: views.aggregate.count,
    createdBy,
    description,
  };
};

export const mapReadingListRequest = (n: any) => {
  const { note, bookmarkedAt } = n;
  const {
    id,
    createdBy,
    title,
    description,
    updatedAt,
    views,
    likes,
    topic: topicObj,
  } = note;
  const { name: topic, textbook } = topicObj;
  const { subject, gradeLevel } = textbook;
  return {
    id,
    title,
    topic,
    subject,
    gradeLevel,
    updatedAt,
    likes: likes.aggregate.count,
    views: views.aggregate.count,
    createdBy,
    description,
    bookmarkedAt,
  };
};
export const mapNoteRequest = ({
  id,
  createdBy,
  title,
  description,
  updatedAt,
  views,
  likes,
  content,
  topic: topicObj,
  published,
}: any) => {
  const { name: topic, textbook } = topicObj;
  const { subject, gradeLevel } = textbook;
  return {
    id,
    title,
    topic,
    subject,
    gradeLevel,
    updatedAt,
    content,
    likes: likes.aggregate.count,
    views: views.aggregate.count,
    createdBy,
    description,
    published,
  };
};

export const mapNoteRequestForUpdate = ({
  id,
  title,
  description,
  content,
  topic: topicObj,
  published,
}: any) => {
  const { id: topicId, name: topic, textbook } = topicObj;
  const { subject, gradeLevel } = textbook;
  return {
    id,
    title,
    description,
    content,
    published,
    topic: { id: topicId, subject, gradeLevel, topic },
  };
};
