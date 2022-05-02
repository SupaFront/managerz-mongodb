const Joi = require('joi');
const { Schema, model } = require('mongoose');

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minLength: 8,
    },
    login: {
      type: String,
      required: [true, 'Login is required'],
      unique: true,
    },
    token: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      default: 'manager',
    },
  },
  { versionKey: false, timestamps: true },
);

const registerJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
  login: Joi.string().required(),
});

const loginJoiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(8).required(),
});

const userJoiSchemas = {
  register: registerJoiSchema,
  login: loginJoiSchema,
};

const User = model('user', userSchema);

module.exports = { userJoiSchemas, User };
