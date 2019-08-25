import { Router } from 'express';
import authController from '../controllers/auth.controller'

const router = Router();

router.post('/kakaoLogin', authController.kakaoLogin)
router.post('/getUserProfile', authController.getUserProfile);

export default router;