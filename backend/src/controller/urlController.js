import ShortUrl from "../models/shortUrl.js";
import { generateUrl, redirectingToOriginalUrl } from "../services/urlService.js";


const createShortUrl = async(req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ message: "Please provide a URL" });
  }

  if(!req.user){
    const existOriginalUrl = await ShortUrl.findOne({ originalUrl });

    if (existOriginalUrl) {
      return res.status(200).json({
        message: "Short URL already exists",
        shortUrl: process.env.APP_URL + existOriginalUrl.shortUrl,
      });
    }

    const newUrl = await generateUrl(originalUrl);

    return res.status(201).json({
      originalUrl: newUrl.originalUrl,
      shortUrl: process.env.APP_URL + newUrl.shortUrl,
      message: "Short URL created successfully",
    });
  }

  const existOriginalUrl = await ShortUrl.findOne({ originalUrl });

  if (existOriginalUrl) {
    return res.status(200).json({
      message: "Short URL already exists",
      shortUrl: process.env.APP_URL + existOriginalUrl.shortUrl,
    });
  }

  const newUrl = await generateUrl(originalUrl, req.user.id);


  return res.status(201).json({
    originalUrl: newUrl.originalUrl,
    shortUrl: process.env.APP_URL + newUrl.shortUrl,
    userId: newUrl.user._id,
    message: "Short URL created successfully",
  });
};



const redirectToOriginalUrl = async (req, res) => {
  const { url } = req.params;
  try {
    const urlExist = await redirectingToOriginalUrl(url);

    if (urlExist) {
      res.redirect(urlExist.originalUrl);
    } else {
      return res.status(404).json({ message: "Short URL not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



export { createShortUrl, redirectToOriginalUrl };    