import ShortUrl from "../models/shortUrl.js";


export const createUrlWithoutUser = async(originalUrl,shortUrl)=>{
    const newUrl = new ShortUrl({
      originalUrl,
      shortUrl,
    });

    await newUrl.save();
    return newUrl;
}


export const createUrlWithUser = async (originalUrl, shortUrl, userId) => {
  const newUrl = new ShortUrl({
    originalUrl,
    shortUrl,
    user:userId
  });

  await newUrl.save();
};

