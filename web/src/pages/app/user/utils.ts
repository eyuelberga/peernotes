const mapStudentProfile = ({
  fullname,
  username,
  gradeLevel,
  school,
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
    bio,
    subjects,
    totalNotes: totalPublishedNotes.aggregate.count,
  };
};

export default mapStudentProfile;
