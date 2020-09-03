import express from 'express';
import teachersCourses from '../controllers/teachersCourses';

const router = express.Router();

router.post('/my-courses', teachersCourses.getCourses)
router.post('/course', teachersCourses.createCourse);
router.get('/course/:c_id', teachersCourses.readCourse);
router.put('/course/:c_id', teachersCourses.updateCourse);
router.delete('/course/:c_id', teachersCourses.deleteCourse);

module.exports = router;