import bcrypt from "bcrypt";
import {
  createUser,
} from "../dao/authDao.js";

export const registerUser = async (username, email, password) => {
  try {
    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await createUser(username, email, hashedPassword);
    return newUser;
  } catch (err) {
    console.log("Error in registerUser: ", err);
    throw new Error("Error in registerUser");
  }
};



