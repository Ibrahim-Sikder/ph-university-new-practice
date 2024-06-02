import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyInto = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultyFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};
const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};
const deleteAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.deleteOne({ id });
  return result;
};
const updateAcademicFacultyInto = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
 

  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
   createAcademicFacultyInto,
  getAllAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
 updateAcademicFacultyInto,
  deleteAcademicFacultyFromDB,
};
