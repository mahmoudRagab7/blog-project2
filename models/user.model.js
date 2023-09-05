const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcryptjs = require("bcryptjs");

const userSchema = new Schema({
  firstName: {
    type: String,
    trim: true,
    reqired: true,
  },
  lastName: {
    type: String,
    trim: true,
    reqired: true,
  },
  email: {
    type: String,
    trim: true,
    reqired: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    reqired: true,
    minlength: 8,
  },
  tokens: [
    {
      type: String,
      required: true,
    },
  ],
  cookies: {
    type: [String],
    default: [],
  },
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    this.password = await bcryptjs.hash(this.password, 8);
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "mahmoudRagab7");
  user.tokens = user.tokens.concat(token);
  await user.save();
  return token;
};

const User = mongoose.model("user", userSchema);
module.exports = User;
