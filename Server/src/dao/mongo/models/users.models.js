import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  age: { type: Number },
  email: { type: String },
  password: { type: String },
  googleId: { type: String },
  githubId: { type: String },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
  role: {
    type: String,
    default: "user",
  },
  document: [
    {
      name: { type: String },
      reference: { type: String },
    },
  ],
  lastConnection: String,
  thumbnail: [String],
});

userSchema.pre("findOne", function () {
  this.populate("cart");
});

const usersModel = mongoose.model(userCollection, userSchema);

export default usersModel;
