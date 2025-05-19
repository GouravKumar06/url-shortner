
import axiosInstance from "../utils/axiosInstance";

export const createShortUrl = async (url) => {
  return await axiosInstance.post("/create", {
    originalUrl: url,
  });
};