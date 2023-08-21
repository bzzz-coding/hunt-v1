import User from "../models/userModel.js";
import { StatusCodes } from "http-status-codes";
import { hashSaltPassword, comparePassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

// POST Create a User
export const register = async (req, res) => {
  // Model can count how many documents we currently have
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  // Override req.body.password
  req.body.password = await hashSaltPassword(req.body.password);
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "User created" }); // 201
};

// Login User
export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const isValidLogin =
    user && (await comparePassword(req.body.password, user.password));
  if (!isValidLogin) {
    throw new UnauthenticatedError("wrong login credentials");
  }

  const token = createJWT({ userId: user._id, role: user.role });

  const oneDayInMilliseconds = 60 * 60 * 60 * 1000;

  // Send back a cookie, then, every req will have this cookie
  res.cookie("jwtToken", token, {
    httpOnly: true, // can't be accessed by JavaScript
    expires: new Date(Date.now() + oneDayInMilliseconds),
    secure: process.env.NODE_ENV === "production", // If in production, only accessed using https; when in development, http
  });

  res.status(StatusCodes.OK).json({ msg: "logged in" });
};

// Logout User
export const logout = async (req, res) => {
  res.cookie("jwtToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};
