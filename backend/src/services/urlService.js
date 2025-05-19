import { createUrlWithoutUser,createUrlWithUser } from "../dao/urlDao.js";
import ShortUrl from "../models/shortUrl.js";
import { generateUuid } from "../utils/helpers.js";

export const generateUrl = async (originalUrl, userId) => {

  const shortUrl = generateUuid(8);
  const newUrl = userId
    ? await createUrlWithUser(originalUrl, shortUrl, userId)
    : await createUrlWithoutUser(originalUrl, shortUrl);

  return newUrl;
};

export const redirectingToOriginalUrl = async (url) => {
  const urlExist = await ShortUrl.findOneAndUpdate({ shortUrl: url }, { $inc: { clicks: 1 } });
  return urlExist; 
};