import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsynce";
import { sendResponse } from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async(req, res)=>{

    const result = await AcademicSemesterServices.createAcademicSemesterFromDB(req.body);
 
    sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'Academic Semester is created successfully',
     data:result
   })
 })
 const getAllAcademicSemester = catchAsync(async(req, res)=>{
 
    const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();
 
    sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'Academic Semester are retrieved successfully',
     data:result
   })
 })
 const getSingleAcademicSemester = catchAsync(async(req, res)=>{
   const {semesterId} = req.params
 
    const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);
 
    sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'Single Academic Semester is retrieved successfully',
     data:result
   })
 })
 const deleteAcademicSemester = catchAsync(async(req, res)=>{
   const {semesterId} = req.params
 
    const result = await AcademicSemesterServices.deleteAcademicSemesterFromDB(semesterId);
 
    sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'Academic Semester delete successfully',
     data:result
   })
 })
 const updateAcademicSemester = catchAsync(async(req, res)=>{
   const {semesterId} = req.params
 
    const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(semesterId,req.body);
 
    sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'Academic Semester update successfully',
     data:result
   })
 })
 
 
 export const AcademicSemesterControllers = {
     createAcademicSemester,
     getAllAcademicSemester,
     getSingleAcademicSemester,
     updateAcademicSemester,
     deleteAcademicSemester
  
 }
 