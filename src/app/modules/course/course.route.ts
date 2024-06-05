import express from 'express'
import { validateRequest } from '../../middlewares/validateRequest'
import { CourseControllers } from './course.controller'
import { CourseValidations } from './course.validation'


const router = express.Router()



router.post('/create-course', validateRequest(CourseValidations.createCourseValidationSchema), CourseControllers.createCourse)

router.get('/', CourseControllers.getAllCourses)
router.get('/:id', CourseControllers.getSingleCourse)
router.delete('/:id', CourseControllers.deleteCourse)
router.patch('/:id', CourseControllers.updateCourse)



export const CourseRoutes = router