import { generateUrl, redirectingToOriginalUrl } from "../services/urlService.js";


const createShortUrl = async(req, res) => {
  const { originalUrl } = req.body;

  const newUrl = await generateUrl(originalUrl);

  res.status(201).json({
    originalUrl: newUrl.originalUrl,
    shortUrl: process.env.APP_URL + newUrl.shortUrl,
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
    res.status(500).json({ error: "Internal server error" });
  }
};



export { createShortUrl, redirectToOriginalUrl };    