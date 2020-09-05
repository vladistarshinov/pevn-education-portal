import express from 'express';
import deliveries from '../../controllers/teachers/deliveries';

const router = express.Router();

router.get('/deliveries/:h_id', deliveries.getDeliveries);

module.exports = router;