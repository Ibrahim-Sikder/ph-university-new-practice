import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user not found');
  }

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
  }
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  // const isPasswordMatched = await bcrypt.compare(payload.password, isUserExists?.password)
  // if (!(await User.isPasswordMatched(payload.password, user.password))) {
  //   throw new AppError(httpStatus.FORBIDDEN, 'password do not matched.');
  // }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange
  };
};

export const AuthServices = {
  loginUser,
};