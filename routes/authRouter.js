import { Router } from "express";
const router = Router();

import { register, login, logout } from "../controllers/authController.js";
import {
  validateUserRegistration,
  validateUserLogin,
} from "../middleware/validationMiddleware.js";

router.post("/register", validateUserRegistration, register);
router.post("/login", validateUserLogin, login);
router.get("/logout", logout);

export default router;
