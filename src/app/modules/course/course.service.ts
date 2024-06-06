import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async () => {

  const result = await Course.find().populate('preRequisiteCourses.course');
  return result;
};
const getSingleCoursesFromDB = async (id: string) => {
  const result = await Course.findById(id).populate('preRequisiteCourses.course');
  return result;
};

const deleteCoursesFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const updateCoursesIntoDb = async (id: string, payload:Partial<TCourse>) => {
  const {preRequisiteCourses, ...courseRemaining} = payload
  const updateBasicCourseInfo = await Course.findByIdAndUpdate(id,
    courseRemaining,
    {
      new: true, 
      runValidators: true
    }
  )
  if(preRequisiteCourses && preRequisiteCourses.length > 0 ){
    const deletedPreRequisites = preRequisiteCourses.filter((el)=>el.course &&el.isDeleted,).map((el)=>el.course)

    const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(id,{
      $pull:{preRequisiteCourses:{course: {$in: deletedPreRequisites}}}
    })

    
  }
  return updateBasicCourseInfo;
};


export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCoursesFromDB,
  deleteCoursesFromDB,
  updateCoursesIntoDb,
};
