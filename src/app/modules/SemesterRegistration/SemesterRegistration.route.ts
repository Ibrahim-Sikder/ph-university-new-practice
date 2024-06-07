import express from 'express';
import { SemesterRegistrationController } from './SemesterRegistration.controller';

const router = express.Router();

router.post('/create-semester-registration', SemesterRegistrationController.createSemesterRegistration);

router.get('/:id',SemesterRegistrationController.getSingleSemesterRegistration);

router.patch('/:id', SemesterRegistrationController.updateSemesterRegistration);

router.delete('/:id', SemesterRegistrationController.deleteSemesterRegistration);

router.get('/', SemesterRegistrationController.getAllSemesterRegistrations);

export const semesterRegistrationRoutes = router;
