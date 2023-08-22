import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Job from "../models/jobModel.js";
import cloudinary from "cloudinary";
// import { promises as fs } from "fs";
import { formatImage } from "../middleware/multerMiddleware.js";

// Get current user
export const getCurrentUser = async (req, res) => {
  const user = (await User.findById(req.user.userId)).removePassword();
  res.status(StatusCodes.OK).json({ user, msg: "get current user" });
};

// Update current user
export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  // console.log(newUser);
  delete newUser.password;
  delete newUser.role;

  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ msg: "updated user" });
};
// export const updateUser = async (req, res) => {
//   if (!Object.keys(req.body).length) {
//     res.status(StatusCodes.BAD_REQUEST).json({ msg: "no input provided" });
//     return;
//   }

//   // Remove password from req.body before updating db just in case
//   let updatedUser = { ...req.body };
//   delete updatedUser.password;

//   if (req.file) {
//     console.log(`logging is still working`);
//     const file = formatImage(req.file);
//     return;
//     // console.log(req.file);
//     const response = await cloudinary.v2.uploader.upload(req.file.path);
//     // await fs.unlink(req.file.path);
//     updatedUser.avatar = response.secure_url;
//     updatedUser.avatarId = response.public_id;
//   }
//   // user is the user before update was applied
//   const user = await User.findByIdAndUpdate(req.user.userId, updatedUser);

//   // if the update request contains an image file and if the previous user had an avatarPublicId, delete the old one from cloudinary
//   if (req.file && user.avatarId) {
//     // console.log(user.avatarId);
//     await cloudinary.v2.uploader.destroy(user.avatarId);
//   }

//   res.status(StatusCodes.OK).json({ msg: "updated user" });
// };

// Get App Stats
export const getAppStats = async (req, res) => {
  const userCount = await User.countDocuments();
  const jobCount = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ userCount, jobCount });
};
