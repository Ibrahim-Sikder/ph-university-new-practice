import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from "./academicSemester.interface"
import { AcademicSemester } from "./academicSemester.model"


const createAcademicSemesterFromDB = async (payload:TAcademicSemester)=>{
    // type TAcademicSemesterCodeMapper = {
    //     [key: string]: string
    // }

 if(academicSemesterNameCodeMapper[payload.name] !== payload.code){
    throw new AppError( httpStatus.NOT_FOUND,'Invalid semester code!')
 }


    const result = await AcademicSemester.create(payload);
    return result;
}

const getAllAcademicSemesterFromDB = async () => {

    const result = await AcademicSemester.find();
    return result;
  };
  const getSingleAcademicSemesterFromDB = async (id:string) => {
  
    const result = await AcademicSemester.findById(id);
    return result;
  };
  const deleteAcademicSemesterFromDB = async (id:string) => {
  
    const result = await AcademicSemester.deleteOne({id});
    return result;
  };
  const updateAcademicSemesterIntoDB = async (
    id: string,
    payload: Partial<TAcademicSemester>,
  ) => {
    if (
      payload.name &&
      payload.code &&
      academicSemesterNameCodeMapper[payload.name] !== payload.code
    ) {
      throw new AppError( httpStatus.NOT_FOUND,'Invalid Semester Code');
    }
  
    const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return result;
  };
  


export const AcademicSemesterServices = {
    createAcademicSemesterFromDB,
    getAllAcademicSemesterFromDB,
    getSingleAcademicSemesterFromDB,
    updateAcademicSemesterIntoDB, 
    deleteAcademicSemesterFromDB
}
