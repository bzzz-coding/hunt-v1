import { Router } from "express";
import {
  getCurrentUser,
  updateUser,
  getAppStats,
} from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import {
  authorizePermission,
  checkForTestUser,
} from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

const router = Router();

router.get("/current-user", getCurrentUser);
router.patch(
  "/update-user",
  upload.single("avatar"),
  checkForTestUser,
  validateUpdateUserInput,
  updateUser
);
router.get("/admin/app-stats", authorizePermission, getAppStats);

export default router;
