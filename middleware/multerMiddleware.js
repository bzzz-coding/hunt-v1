import multer from "multer";

// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.

// https://www.npmjs.com/package/multer
const storage = multer.diskStorage({
  // destination is used to determine within which folder the uploaded files should be stored.
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  // filename is used to determine what the file should be named inside the folder.
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;
