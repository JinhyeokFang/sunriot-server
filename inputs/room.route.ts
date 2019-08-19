import { Router } from 'express';
import roomController from '../controllers/room.controller'

const router = Router();

router.post('/checkin', roomController.checkin);
router.post('/checkout', roomController.checkout);
router.post('/getrooms', roomController.getRooms);

export default router;