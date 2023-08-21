import jwt from "jsonwebtoken";

// payload will be user id; JWT will be located in the cookie; will decode it in the server
export const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

export const verifyJWT = (token) => {
  // jwt.verify() takes two arguments, one is the token string value, the other is the secret key; the method returns a decode object that contains the initial payload info
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};
