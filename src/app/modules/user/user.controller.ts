/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import { UserServices } from './user.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsynce';




const createStudent: RequestHandler = catchAsync(async (req, res, next) => {
  try {
    const { password, student: studentData } = req.body;
    //   const zodParsedData = studentValidationSchema.parse(studentData);

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

export const UserController = {
  createStudent,
};
