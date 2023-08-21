import { body, param, validationResult } from "express-validator"; // https://express-validator.github.io/docs/api/validation-chain/#isbytelength
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPES } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      // validationResult(req) extracts the validation results from a request, wraps them in a Result object, and returns it.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessage = errors
          .array()
          .map((error) => error.msg)
          .join("; "); // errorMessage is a ;-separated string

        // Based on the errorMessage, throw specific errors
        if (errorMessage.startsWith("no job")) {
          throw new NotFoundError(errorMessage); // 404
        }
        if (errorMessage.startsWith("not authorized")) {
          throw new UnauthorizedError(errorMessage); // 404
        }
        throw new BadRequestError(errorMessage); // invalid id
      }
      next(); // controller
    },
  ];
};

export const validateJobInput = withValidationErrors([
  ["company", "position", "jobLocation"].map((input) =>
    body(input).notEmpty().withMessage(`${input} is required`)
  ),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid job status"),
  body("jobType")
    .isIn(Object.values(JOB_TYPES))
    .withMessage("invalid job type"),
]);

export const validateIdParam = withValidationErrors([
  /*
  Custom validators must return a truthy value to indicate that the field is valid, or falsy to indicate it's invalid.

  Custom validators can be asynchronous, in which case it can return a promise. The returned promise is awaited on, and it must resolve in order for the field to be valid. If it rejects, the field is deemed invalid.

  If a custom validator throws, it's also considered invalid.
  */
  param("id").custom(async (value, { req }) => {
    // Can access request
    // check if
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    // No need to specify the errors yet as we'll handle errors in the callback function
    if (!isValidId) throw new Error("invalid id");
    const job = await Job.findById(value);
    if (!job) {
      throw new Error(`no job with id ${value} is found`);
    }
    console.log(req.user);
    const { userId, role } = req.user;
    if (job.createdBy.toString() !== userId && role !== "admin") {
      throw new Error("not authorized to access this job");
    }
  }),
]);

// Validate user register
export const validateUserRegistration = withValidationErrors([
  ["name", "lastName", "email", "password", "location"].map((input) =>
    body(input).notEmpty().withMessage(`${input} is required`)
  ),
  body("email")
    .isEmail()
    .withMessage("invalid email")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("email already exists");
      }
    }),
  body("password")
    .isStrongPassword({ minLength: 8 })
    .withMessage(
      "password needs to have at least 8 characters and needs to be a strong password"
    ),
]);

// Validate login input
export const validateUserLogin = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateUpdateUserInput = withValidationErrors([
  // ["name", "lastName", "location", "email"].map((input) =>
  //   body(input).notEmpty().withMessage(`${input} is required`)
  // ),
  body("email")
    .isEmail()
    .withMessage("invalid email")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error("email already exists");
      }
    })
    .optional({ nullable: true }),
]);
