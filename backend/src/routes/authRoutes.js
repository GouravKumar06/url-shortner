import express from 'express';
import {
  login,
  profile,
  signUp,
  refresh,
  logoutUser,
} from "../controller/authController.js";
import { isAuthenticated } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/signup',signUp)
router.post('/login',login);
router.post('/logout',logoutUser)
router.post('/me',isAuthenticated,profile)
router.post("/refresh", refresh);

export default router;