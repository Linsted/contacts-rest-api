const Joi = require("joi");

const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

const JoiSchema = {
  addContactSchema: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/^\d{10}$/)
      .required(),
    favorite: Joi.boolean(),
  }),

  updateContactSchema: Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^\d{10}$/),
    favorite: Joi.boolean(),
  })
    .or("name", "email", "phone", "favorite")
    .required(),

  updateFavoriteSchema: Joi.object({ favorite: Joi.boolean().required() }),
};

module.exports = {
  Contact,
  JoiSchema,
};
