/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { TEnrolledCourse } from "./enrolledCourse.interface";

const createEnrolledCourseIntoDB = async (
  userId: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  payload: TEnrolledCourse,
) => {
  
};

const getMyEnrolledCoursesFromDB = async (
  studentId: string,
  query: Record<string, unknown>,
) => {
 
};

const updateEnrolledCourseMarksIntoDB = async (
  facultyId: string,
  payload: Partial<TEnrolledCourse>,
) => {
  

};

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  getMyEnrolledCoursesFromDB,
  updateEnrolledCourseMarksIntoDB,
};
