import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsynce";
import { sendResponse } from "../../utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async(req, res)=>{

    const result = await AcademicDepartmentServices.createAcademicDepartmentInto(req.body);
 
    sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'Academic Department is created successfully',
     data:result
   })
 })
 const getAllAcademicDepartment = catchAsync(async(req, res)=>{
 
    const result = await AcademicDepartmentServices.getAllAcademicFacultyFromDB();
 
    sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'Academic Department are retrieved successfully',
     data:result
   })
 })
 const getSingleAcademicDepartment = catchAsync(async(req, res)=>{
   const {departmentId} = req.params
 
    const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(departmentId);
 
    sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'Single Academic Department is retrieved successfully',
     data:result
   })
 })
 const deleteAcademicDepartment = catchAsync(async(req, res)=>{
   const {departmentId} = req.params
 
    const result = await AcademicDepartmentServices.deleteAcademicDepartmentFromDB(departmentId);
 
    sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'Academic Department delete successfully',
     data:result
   })
 })
 const updateAcademicDepartment = catchAsync(async(req, res)=>{
   const {departmentId} = req.params
 
    const result = await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(departmentId,req.body);
 
    sendResponse(res, {
     statusCode: httpStatus.OK,
     success: true,
     message: 'Academic Department update successfully',
     data:result
   })
 })
 
 
 export const AcademicDepartmentControllers = {
      createAcademicDepartment,
      getAllAcademicDepartment,
      getSingleAcademicDepartment,
      updateAcademicDepartment,
      deleteAcademicDepartment

 }
 