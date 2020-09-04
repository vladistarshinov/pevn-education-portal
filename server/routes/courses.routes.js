import express from 'express';
import courses from '../controllers/courses';

const router = express.Router();

router.post('/my-courses', courses.getCourses)
router.post('/course', courses.createCourse);
router.get('/course/:c_id', courses.readCourse);
router.put('/course/:c_id', courses.updateCourse);
router.delete('/course/:c_id', courses.deleteCourse);

module.exports = router;