export const mapNoteReportsRequest = ({
  note: {
    id,
    createdBy,
    title,
    description,
    updatedAt,
    content,
    views,
    likes,
    topic: {
      name: topic,
      textbook: { subject, gradeLevel },
    },
  },
  reportType,
  reportDescription,
  username,
}: any) => {
  return {
    id,
    title,
    topic,
    subject,
    content,
    gradeLevel,
    updatedAt,
    likes: likes.aggregate.count,
    views: views.aggregate.count,
    createdBy,
    description,
    report: { type: reportType, description: reportDescription },
    username,
  };
};

export const mapGetStartedsRequests = ({
  school,
  studentId,
  gradeLevel,
  picture1,
  picture2,
  fullname,
  username,
  user: { subjects: ss },
}: any) => {
  const subjects = ss.map(({ subject }: any) => {
    return subject;
  });
  return {
    school,
    studentId,
    gradeLevel,
    picture1,
    picture2,
    fullname,
    subjects,
    username,
  };
};
