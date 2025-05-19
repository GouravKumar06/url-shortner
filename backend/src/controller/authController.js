import { registerUser } from "../services/authService.js";
import { findUserByEmail, generateAuthTokens } from "../dao/authDao.js";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try{
    const { username,email,password } = req.body;

    const existingUser = await findUserByEmail(email);
    
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const user = await registerUser(username, email, password);

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  }catch(err){
    console.log(err);
    res.status(500).json({message: "Internal Server Error"});
  }
};

export const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        const existingUser = await findUserByEmail(email);

        if (!existingUser) {
          return res
            .status(400)
            .json({ message: "User does not exist.. Please Sign Up" });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
        const { accessToken, refreshToken } = await generateAuthTokens(
          existingUser
        );
        
        // Save refresh token in cookies
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
    
        return res.status(200).json({
            message: "Login successful",
            accessToken,
        });
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}


export const profile = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Profile fetched successfully",
            user,
        });
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}


export const refresh = async (req, res) => {
    try{
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { accessToken } = await generateAuthTokens(user);

        return res.status(200).json({
            message: "Token refreshed successfully",
            accessToken,
        });
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}



