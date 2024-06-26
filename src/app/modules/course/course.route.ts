import express from 'express'
import { validateRequest } from '../../middlewares/validateRequest'
import { CourseControllers } from './course.controller'
import { CourseValidations } from './course.validation'


const router = express.Router()



router.post('/create-course', validateRequest(CourseValidations.createCourseValidationSchema), CourseControllers.createCourse)

router.get('/', CourseControllers.getAllCourses)
router.get('/:id', CourseControllers.getSingleCourse)
router.delete('/:id', CourseControllers.deleteCourse)

router.delete('/:courseId/remove-faculties',validateRequest(CourseValidations.facultiesWithCourseValidationSchema), CourseControllers.removeFacultiesFromCourse )
router.put('/:courseId/assign-faculties',validateRequest(CourseValidations.facultiesWithCourseValidationSchema), CourseControllers.assignFaculties )

router.patch('/:id',validateRequest(CourseValidations.updateCourseValidationSchema), CourseControllers.updateCourse)



export const CourseRoutes = router