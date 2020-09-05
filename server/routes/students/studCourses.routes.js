import express from 'express';
import studCourses from '../../controllers/students/studCourses';

const router = express.Router();

router.get('/courses', studCourses.getCourses)

module.exports = router;