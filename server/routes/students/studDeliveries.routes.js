import express from 'express';
import studDeliveries from '../../controllers/students/studDeliveries';

const router = express.Router();

router.post('/delivery', studDeliveries.addDelivery);

module.exports = router;