/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  id: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
//   passwordChangedAt?: Date;
  role: 'superAdmin' | 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
  passwordChangedAt?:Date
}


  
  export type NewUser = {
    password: string,
    role:string,
    id:string
  }
  
  export interface UserModel extends Model<TUser> {
    isUserExistsByCustomId(id:string): Promise<TUser>
    isPasswordMatched(plainTextPassword:string,hashedPassword:string): Promise<boolean>
  }


  export type TUserRole = keyof typeof USER_ROLE;