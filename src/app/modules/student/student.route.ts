import express from 'express';
import { StudentController } from './student.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.validation';


const router = express.Router();


router.get('/', StudentController.getAllStudent)
router.get('/:studentId', StudentController.getSingleStudent)
router.delete('/:studentId', StudentController.deleteStudent)
router.patch('/:studentId', validateRequest(updateStudentValidationSchema),StudentController.updateStudent)





export const StudentRoutes = router;