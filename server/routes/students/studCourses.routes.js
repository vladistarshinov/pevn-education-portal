import express from 'express';
import studCourses from '../../controllers/students/studCourses';

const router = express.Router();

router.get('/courses', studCourses.getCourses);
router.post('/my-courses/:c_id', studCourses.getMyCourses);
router.post('/course/:c_id', studCourses.joinCourse);

module.exports = router;