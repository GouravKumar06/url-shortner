
import express from 'express';
import {
  createShortUrl,
  redirectToOriginalUrl,
} from "../controller/urlController.js";
import { isAuthenticated } from '../middleware/authMiddleware.js';
import ShortUrl from '../models/shortUrl.js';

const router = express.Router();


router.post("/create", createShortUrl);
router.post('/createUrl/user',isAuthenticated, createShortUrl);

router.get("/track", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware

    const urls = await ShortUrl.find({ user: userId }).sort({ createdAt: -1 });


    // Map and pick only fields you want, also prepend APP_URL
    const responseUrls = urls.map((url) => ({
      _id: url._id,
      originalUrl: url.originalUrl,
      shortUrl: `${process.env.APP_URL}${url.shortUrl}`, // prepend domain here
      clicks: url.clicks,
      createdAt: url.createdAt,
    }));

    res.json({ success: true, urls: responseUrls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//redirect to short url
router.get("/:url", redirectToOriginalUrl);


export default router;