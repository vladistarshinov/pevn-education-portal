import express from 'express';
import auth from '../controllers/auth';

const router = express.Router();

router.post('/register', auth.register);

module.exports = router;