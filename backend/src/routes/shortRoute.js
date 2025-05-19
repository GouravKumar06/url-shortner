
import express from 'express';
import {
  createShortUrl,
  redirectToOriginalUrl,
} from "../controller/urlController.js";
import { isAuthenticated } from '../middleware/authMiddleware.js';
const router = express.Router();


router.post("/create", createShortUrl);
router.post('/createUrl/user',isAuthenticated, createShortUrl);

//redirect to short url
router.get("/:url", redirectToOriginalUrl);


export default router;