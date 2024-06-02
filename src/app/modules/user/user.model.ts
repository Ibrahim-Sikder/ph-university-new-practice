/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from "mongoose";
import { UserStatus } from "./user.constant";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

const userSchema = new Schema<TUser>(
    {
      id: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        // required: true,
        // unique: true,
      },
      password: {
        type: String,
        required: true,
        select: 0,
      },
      needsPasswordChange: {
        type: Boolean,
        default: true,
      },
      // passwordChangedAt: {
      //   type: Date,
      // },
      role: {
        type: String,
        enum: ['superAdmin', 'student', 'faculty', 'admin'],
      },
      status: {
        type: String,
        enum: UserStatus,
        default: 'in-progress',
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    },
  );
  


  userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_round),
    );
    next();
  });
  
  userSchema.post('save',  function (doc, next) {
   doc.password = ''
    next();
  });



export const User = model<TUser>('User', userSchema);
