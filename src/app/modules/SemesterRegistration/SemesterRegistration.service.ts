import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './SemesterRegistration.interface';
import { SemesterRegistration } from './SemesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { RegistrationStatus } from './semesterRegistration.constant';

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;



  const isThereAnyUpcommingOrOngoingSemester = await SemesterRegistration.findOne({
    $or: [{status: 'UPCOMING'}, {status: 'ONGOING'}]
  });

  if(isThereAnyUpcommingOrOngoingSemester){
    throw new AppError(httpStatus.BAD_REQUEST, `There is already a ${isThereAnyUpcommingOrOngoingSemester.status} register semester `)
  }




  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semester is already exist ');
  }

  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This semester not found ');
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationsFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'), query
  ).filter().sort().paginate().filter()

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationsFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id)
  return result;

};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {



  const isSemesterRegisterationExists = await SemesterRegistration.findById(id)
  const currentSemesterStatus = isSemesterRegisterationExists?.status;
  const requestStatus = payload?.status

  if(!isSemesterRegisterationExists){
    throw new AppError(httpStatus.BAD_REQUEST, 'This semester is is not found ')
  }

  const requestedSemester = await SemesterRegistration.findById(id)

  if(requestedSemester?.status === RegistrationStatus.ENDED){
    throw new AppError(httpStatus.BAD_REQUEST, `This semester is already ${requestedSemester?.status}`)

  }

  // upcoming --> ongoing --> ended
if(currentSemesterStatus === RegistrationStatus.UPCOMING && requestStatus === RegistrationStatus.ENDED ){
  throw new AppError(httpStatus.BAD_REQUEST, `you can not directly change status from ${currentSemesterStatus} to ${requestStatus}` )
}
if(currentSemesterStatus === RegistrationStatus.ONGOING && requestStatus === RegistrationStatus.UPCOMING ){
  throw new AppError(httpStatus.BAD_REQUEST, `you can not directly change status from ${currentSemesterStatus} to ${requestStatus}` )
}


const result = await SemesterRegistration.findByIdAndUpdate(id,
  payload,{
    new: true,
    runValidators: true
  }
)

return result 



};

const deleteSemesterRegistrationFromDB = async (id: string) => {};

export const SemesterRegistrationService = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationsFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};
