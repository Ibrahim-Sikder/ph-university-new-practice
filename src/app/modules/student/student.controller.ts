/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import { StudentServices } from './student.service';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsynce';

const getAllStudent: RequestHandler = catchAsync(async (req, res, next) => {
console.log(req.query)
    const result = await StudentServices.getAllStudentFromDB(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is retrieved successfully!',
      data: result,
    });
 
});
const getSingleStudent: RequestHandler = catchAsync(async (req, res, next) => {

    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single student is retrieved successfully!',
      data: result,
    });

});
const deleteStudent: RequestHandler = catchAsync(async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' student is delete successfully!',
      data: result,
    });
  } catch (err) {
    next(err);
  }
});

const updateStudent: RequestHandler = catchAsync(async (req, res, next) => {

  const { studentId } = req.params;
  const {student} = req.body
  const result = await StudentServices.updateStudentIntoDB(studentId, student);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' student update successfully!',
    data: result,
  });

});

export const StudentController = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent
};
