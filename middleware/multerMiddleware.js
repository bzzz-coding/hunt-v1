import multer from "multer";
import DataParser from "datauri/parser.js";
import path from "path";
import { log } from "console";

// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
// https://www.npmjs.com/package/multer

// Can't use diskStorage + Cloudinary image upload with render free tier so the workaround is to use memoryStorage

const storage = multer.memoryStorage();

// const storage = multer.diskStorage({
//   // destination is used to determine within which folder the uploaded files should be stored.
//   destination: (req, file, cb) => {
//     cb(null, "public/uploads");
//   },
//   // filename is used to determine what the file should be named inside the folder.
//   filename: (req, file, cb) => {
//     const fileName = file.originalname;
//     cb(null, fileName);
//   },
// });

const upload = multer({ storage });

const parser = new DataParser();

// helper function:
export const formatImage = (file) => {
  // console.log(file);

  const fileExtension = path.extname(file.originalname).toString();
  return parser.format(fileExtension, file.buffer).content;
};

export default upload;
