import httpStatus from 'http-status';
import { sendResponse } from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import { catchAsync } from '../../utils/catchAsynce';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  const { refreshToken,accessToken, needsPasswordChange} = result
  res.cookie('refreshToken', refreshToken,{
    secure: config.NODE_ENV === 'production',
    httpOnly:true,
  })

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in succesfully!',
    data: {
      accessToken,
      needsPasswordChange
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const user = req.user 
  const {...passwordData} = req.body
  const result = await AuthServices.changePassword(user,passwordData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password update successfully!',
    data: result,
  });
});
const refreshToken = catchAsync(async (req, res) => {
  

  const {refreshToken} = req.cookies
  const result = await AuthServices.refreshToken(refreshToken);


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token retrieve  successfully!',
    data: result,
  });
});
export const AuthController = {
  loginUser,
  changePassword,
  refreshToken
};
