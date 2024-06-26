/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  password: string;
  user: Types.ObjectId ,
  name: TUserName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  isDeleted: boolean;
  profileImg?: string;
  admissionSemester: Types.ObjectId,
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
};

// static method 
export interface StudentModel extends Model<TStudent> {
  isUserExist(id:string): Promise<TStudent | null >;
}



// instant method 

// export type IStudentMethods = {
//   isUserExist(id:string): Promise<TStudent | null>
// }




// export type StudentModel = Model<TStudent, Record<string, never>>;
