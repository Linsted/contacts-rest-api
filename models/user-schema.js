const Joi = require("joi");

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
    avatarURL: String,
  },
  { versionKey: false, timestamps: true }
);

const JoiScheme = {
  registerUser: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    subscription: Joi.string().valid("starter", "pro", "business"),
  }),
  loginUser: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
  updateSubscription: Joi.object({
    subscription: Joi.string().required().valid("starter", "pro", "business"),
  }),
};

const User = model("User", userSchema);

module.exports = {
  User,
  JoiScheme,
};
