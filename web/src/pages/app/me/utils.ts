export const mapStudentProfile = ({
  fullname,
  username,
  gradeLevel,
  school,
  email,
  bio,
  subjects: sb,
  totalPublishedNotes,
}: any) => {
  let subjects: any;

  if (sb) {
    subjects = sb.map(({ subject: s }: any) => {
      return s;
    });
  }

  return {
    fullname,
    username,
    gradeLevel,
    school,
    email,
    bio,
    subjects,
    totalNotes: totalPublishedNotes.aggregate.count,
  };
};

export const mapNotificationsRequest = ({
  subject,
  body,
  id,
  seen,
  to,
  updatedAt,
}: any) => {
  return {
    subject,
    body,
    id,
    seen,
    to,
    updatedAt,
  };
};
