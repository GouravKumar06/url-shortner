import User from "../models/user.js";
import jwt from "jsonwebtoken";


export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
}



export const createUser = async (username, email, hashedPassword) => {
  // Create new user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  return await newUser.save();
};



export const generateAuthTokens = async (user) => {
    const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "50m",
        }
    );

    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "7d",
        }
    );
    return { accessToken, refreshToken };
}