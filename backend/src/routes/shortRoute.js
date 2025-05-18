
import express from 'express';
import {
  createShortUrl,
  redirectToOriginalUrl,
} from "../controller/urlController.js";
const router = express.Router();


router.post("/create", createShortUrl);

//redirect to short url
router.get("/:url", redirectToOriginalUrl);


export default router;