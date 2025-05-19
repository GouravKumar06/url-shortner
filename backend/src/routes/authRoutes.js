import express from 'express';
import { login, profile, signUp,refresh } from '../controller/authController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/signup',signUp)
router.post('/login',login)
router.post('/profile',isAuthenticated,profile)
router.post("/refresh", refresh);

export default router;