import { StatusCodes } from "http-status-codes";

// Error middleware -- need to be placed at the very end of the file, right before the listening port
// Handles error occurred during the processing of a request, catches unexpected errors, or errors intentionally programmed in the code (e.g. throw new Error('message')), indicates an internal server error
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  // Check for custom error first, if not, respond with generic server error code and msg
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "Oops, something went wrong.. try again later";
  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;
