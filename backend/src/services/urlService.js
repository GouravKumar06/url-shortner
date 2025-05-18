import { createUrlWithoutUser } from "../dao/urlDao.js";
import ShortUrl from "../models/shortUrl.js";
import { generateUuid } from "../utils/helpers.js";

export const generateUrl = async (originalUrl) => {
  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL is required" });
  }

  const shortUrl = generateUuid(8);
  const newUrl = await createUrlWithoutUser(originalUrl, shortUrl);

  return newUrl;
};

export const redirectingToOriginalUrl = async (url) => {
  const urlExist = await ShortUrl.findOneAndUpdate({ shortUrl: url }, { $inc: { clicks: 1 } });
  return urlExist; 
};