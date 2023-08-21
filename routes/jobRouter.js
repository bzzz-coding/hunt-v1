import { Router } from "express";
// Initiate an instance of Router
const router = Router();

import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";
import {
  getAllJobs,
  getSingleJob,
  createJob,
  editJob,
  deleteJob,
  showStats,
} from "../controllers/jobController.js";

router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateIdParam, getSingleJob)
  .patch(checkForTestUser, validateIdParam, editJob)
  .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;
