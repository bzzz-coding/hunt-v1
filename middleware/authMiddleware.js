// authenticate user by checking cookie(token) in requests

import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

// Throw UnauthenticatedError if jwtToken/cookie doesn't exist in the request, OR, if the token can't be verified
export const authenticateUser = (req, res, next) => {
  // console.log(req.cookies);
  const { jwtToken } = req.cookies; // Installed and evoked cookieParser in server.js

  if (!jwtToken) {
    throw new UnauthenticatedError("invalid authentication"); // 401
  }

  try {
    const user = verifyJWT(jwtToken); // Object that contains initial payload after login
    // console.log(user);

    // Deconstruct and add these info to the req
    const { userId, role } = user;

    const testUser = userId === "64dd4155984b3bc2e414696d";

    req.user = { userId, role, testUser };

    next();
  } catch (error) {
    throw new UnauthenticatedError("invalid authentication");
  }
};

export const authorizePermission = (req, res, next) => {
  console.log(req.user?.role);
  if (req.user?.role !== "admin") {
    throw new UnauthorizedError("unauthorized user");
  }
  next();
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("Test user, read only.");
  }
};
