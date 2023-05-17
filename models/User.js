import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

// the username will be required and unique with a type String,
// the email will be required and unique with a type String,
// the password will be required with a type String,
// the isAdmin will be a boolean with a default of false so when we create a user he won't be an admin 