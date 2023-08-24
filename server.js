import * as dotenv from "dotenv";
dotenv.config(); // Good practice to evoke early, before setting up express app

import express from "express";
const app = express();

import mongoose from "mongoose";

// routers
import jobRouter from "./routes/jobRouter.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";

// for setting up public folder
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// middleware
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

// Set up middleware morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Set up public folder (once set up, assets in public folder can be access via localhost:4000/filename)
// ES6 Modules syntax of getting __dirname; commonJS can directly use app.use(express.static(path.resolve(__dirname, './public')));
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/dist"))); // express.static() is a built-in middleware

app.use(cookieParser());
// Built-in middleware json
app.use(express.json());
// Security
app.use(helmet());
app.use(mongoSanitize());

// // API
// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

// // Test API
// app.get("/api/v1/test", (req, res) => {
//   res.json({ msg: "test route" });
// });

// Insert express-validator between route and controller
app.post("/api/v1/test", (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hi, ${name}` });
});

// Pass in starting url and router
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

// 'Not found' middleware
// Any time the user tres to access resource not available on the server (e.g., requests or url's not defined in the API above), send a 404 and error message
app.use("*", (req, res) => {
  // Apply to all requests, any URL
  res.status(404).json({ msg: "not found" });
});

// Error middleware -- need to be placed at the very end of the file, right before the listening port
// Handles error occurred during the processing of a request, catches unexpected errors, or errors intentionally programmed in the code (e.g. throw new Error('message')), indicates an internal server error
app.use(errorHandlerMiddleware);

// listen
const port = process.env.PORT || 4000;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running at port ${port}...`);
  });
} catch (err) {
  console.log(err);
  process.exit(1);
}
