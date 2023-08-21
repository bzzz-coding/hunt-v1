import bcrypt from "bcryptjs";

export const hashSaltPassword = async (password) => {
  // Generate salt
  const salt = await bcrypt.genSalt(10);
  // Hash the password with salt
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export const comparePassword = async (inputPassword, storedPassword) => {
  const isMatch = await bcrypt.compare(inputPassword, storedPassword);
  return isMatch;
};
