import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  email: String,
  password: String,
  location: {
    type: String,
    default: "Los Angeles",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: String,
  avatarId: String,
});

//  Instance method, applied to the user object sent back from the db
UserSchema.methods.removePassword = function () {
  let obj = this.toObject(); // user to JS object
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
