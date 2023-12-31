enum Topics {
  AUDIT_LOGS_GET = 'audit_logs.get',
  STUDENT_HEALTH_CHECK = 'student.healthCheck',
  ACADEMIC_RECORDS_HEALTH_CHECK = 'academic_records.healthCheck',
  AUDIT_LOGS_HEALTH_CHECK = 'audit_logs.health_check',
  STUDENT_GET = 'student.get',
  STUDENT_CREATED = 'student.created',
  NOTIFY_ACADEMIC_RECORDS = 'notify.academic_records',
  STUDENT_START_DEGREE = 'student.startDegree',
  STUDENT_FREEZE_ENROLLMENT = 'degree.freezeEnrollment',
  STUDENT_QUIT_DEGREE = 'degree.quitDegree',
  STUDENT_ENROLL_COURSE_EDITION = 'student.enroll.courseEdition',
  ADD_COURSE_EDITION_TOPIC = 'add_course_edition_id',
  DELETE_COURSE_EDITION_TOPIC = 'delete_course_edition_id',
  ADD_CERTIFICATE = 'add.certificate',
  CREATE_APPEAL_ENROLLMENT = 'appeal.created',
  STUDENT_CREATE = 'student.create',
  STUDENT_DELETE = 'student.delete',
  STUDENT_UPDATE = 'student.update',
  STUDENT_GET_DEGREES = 'student.getDegrees',
  GET_CERTIFICATE = 'certificate',
  GET_EXAMS = 'get.exams',
  GET_ACADEMIC_RECORDS = 'get.academicRecords',
  GET_STUDENT_RESULTS = 'get.studentResults',
  GRADE_BY_STUDENT = 'grade.by.student',
}

export default Topics;
