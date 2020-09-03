import express from 'express';
import teachersAccount from '../controllers/teachersAccount';

const router = express.Router();

router.post('/course', teachersAccount.createCourse);
router.get('/course/:c_id', teachersAccount.readCourse);

module.exports = router;