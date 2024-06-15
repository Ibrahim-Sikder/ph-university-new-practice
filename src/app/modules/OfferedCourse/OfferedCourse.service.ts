import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import { AppError } from "../../error/AppError";
import { SemesterRegistration } from "../SemesterRegistration/SemesterRegistration.model";
import { TOfferedCourse } from "./OfferedCourse.interface";
import { OfferedCourse } from "./OfferedCourse.model";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { Course } from "../course/course.model";
import { Faculty } from "../Faculty/faculty.model";
import { hasTimeConflict } from "./OfferedCourse.utils";


const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {semesterRegistration, academicDepartment, academicFaculty, course, faculty, section , days, startTime, endTime} = payload

  const isSemesterRegistrationExists = await SemesterRegistration.findById(semesterRegistration)

  const academicSemester = isSemesterRegistrationExists?.academicSemester
   
  if(!isSemesterRegistrationExists){
     throw new AppError(httpStatus.NOT_FOUND, 'Semester registration not found ')
  }
  const isacademicDepartmentExists = await AcademicDepartment.findById(academicDepartment)
  if(!isacademicDepartmentExists){
     throw new AppError(httpStatus.NOT_FOUND, 'academic department not found ')
  }
  const isacademicFacultyExist = await AcademicFaculty.findById(academicFaculty)
  if(!isacademicFacultyExist){
     throw new AppError(httpStatus.NOT_FOUND, 'academic Faculty not found ')
  }

  const isacademicSemesterExist = await AcademicSemester.findById(academicSemester)
  if(!isacademicSemesterExist){
     throw new AppError(httpStatus.NOT_FOUND, 'academic semester not found ')
  }
  const isCourseExists = await Course.findById(course)
  if(!isCourseExists){
     throw new AppError(httpStatus.NOT_FOUND, 'course not found ')
  }
  const isfacultyExists = await Faculty.findById(faculty)
  if(!isfacultyExists){
     throw new AppError(httpStatus.NOT_FOUND, 'faculty  not found ')
  }

  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isacademicDepartmentExists.name} is not  belong to this ${isacademicDepartmentExists.name}`,
    );
  }

  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
  await OfferedCourse.findOne({
    semesterRegistration,
    course,
    section,
  });

if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
  throw new AppError(
    httpStatus.BAD_REQUEST,
    `Offered course with same section is already exist!`,
  );
}

// get the schedules of the faculties
const assignedSchedules = await OfferedCourse.find({
  semesterRegistration,
  faculty,
  days: { $in: days },
}).select('days startTime endTime');

const newSchedule = {
  days,
  startTime,
  endTime,
};

if (hasTimeConflict(assignedSchedules, newSchedule)) {
  throw new AppError(
    httpStatus.CONFLICT,
    `This faculty is not available at that time ! Choose other time or day`,
  );
}



  const result = await OfferedCourse.create({...payload, academicSemester});
  return result


};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await offeredCourseQuery.modelQuery;
  const meta = await offeredCourseQuery.countTotal();

  return {
    meta,
    result,
  };
};

// const getMyOfferedCoursesFromDB = async (
//   userId: string,
//   query: Record<string, unknown>,
// ) => {
 



// };

const getSingleOfferedCourseFromDB = async (id: string) => {
  const offeredCourse = await OfferedCourse.findById(id);

  if (!offeredCourse) {
    throw new AppError(404, 'Offered Course not found');
  }

  return offeredCourse;
};

const deleteOfferedCourseFromDB = async (id: string) => {
    
  
    const result = await OfferedCourse.findByIdAndDelete(id);
  
    return result;
  };
  

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {


  const result = await OfferedCourse.findByIdAndDelete(id);

  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  // getMyOfferedCoursesFromDB,
  getSingleOfferedCourseFromDB,
  updateOfferedCourseIntoDB,
  deleteOfferedCourseFromDB
};
