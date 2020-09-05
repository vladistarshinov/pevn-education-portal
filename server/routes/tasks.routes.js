import express from 'express';
import tasks from '../controllers/tasks';

const router = express.Router();

router.post('/task/:c_id', tasks.createTask);
router.get('/course-tasks/:c_id', tasks.getTasks);

module.exports = router;