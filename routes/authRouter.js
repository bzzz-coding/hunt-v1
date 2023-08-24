import { Router } from "express";
const router = Router();
import rateLimiter from "express-rate-limit";
import { register, login, logout } from "../controllers/authController.js";
import {
  validateUserRegistration,
  validateUserLogin,
} from "../middleware/validationMiddleware.js";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { msg: "IP rate limit exceeded, try in 15 minutes" },
});

router.post("/register", apiLimiter, validateUserRegistration, register);
router.post("/login", apiLimiter, validateUserLogin, login);
router.get("/logout", logout);

export default router;
