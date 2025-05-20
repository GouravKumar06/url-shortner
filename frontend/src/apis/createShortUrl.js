
import axiosInstance from "../utils/axiosInstance";

export const createShortUrl = async (url) => {
  return await axiosInstance.post("/create", {
    originalUrl: url,
  });
};

export const createShortUrlWithAccessToken = async(url, accessToken) => {
  return await axiosInstance.post(
    "createUrl/user",
    {
      originalUrl: url,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}



export const loginUser = async (email, password) => {
  return await axiosInstance.post("/login", {
    email,
    password,
  },{
    withCredentials: true,
  });
}


export const registerUser = async (username,email, password) => {
  return await axiosInstance.post("/signup", {
    username,
    email,
    password,
  });
}


export const logoutUser = async (accessToken) => {
  return await axiosInstance.post(
    "/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    },
  );
}
