import express from 'express';
import studTasks from '../../controllers/students/studTasks';

const router = express.Router();

router.get('/tasks/:c_id/:id', studTasks.getTasks);

module.exports = router;