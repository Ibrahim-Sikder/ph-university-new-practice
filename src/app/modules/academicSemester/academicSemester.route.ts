

import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { academicSemesterValidations } from './academicSemester.validation';

const router = express.Router();
router.post('/create-academic-semester', validateRequest(academicSemesterValidations.createAcademicSemesterValidationSchema), AcademicSemesterControllers.createAcademicSemester)


router.get(
    '/',
    AcademicSemesterControllers.getAllAcademicSemester,
  );
  router.get(
    '/:semesterId',
    AcademicSemesterControllers.getSingleAcademicSemester,
  );
  router.delete(
    '/:semesterId',
    AcademicSemesterControllers.deleteAcademicSemester,
  );
  router.patch(
    '/:semesterId',
    validateRequest(academicSemesterValidations.updateAcademicSemesterValidationSchema),
    AcademicSemesterControllers.updateAcademicSemester,
  );
  

export const AcademicSemesterRoutes = router ;