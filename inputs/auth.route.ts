import { Router } from 'express';
import authController from '../controllers/auth.controller'

const router = Router();

router.post('/login', authController.login);
router.post('/kakaoLogin', authController.kakaoLogin)
router.post('/register', authController.register);
router.post('/getUserProfile', authController.getUserProfile);

export default router;