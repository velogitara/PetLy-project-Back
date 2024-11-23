const { Schema, model } = require('mongoose');
const joi = require('joi');
const { handleSaveError } = require('../helpers');
const { regexp } = require('../helpers');

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: regexp.email,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
    },

    name: {
      type: String,
      required: [true, 'Name is required'],
    },

    avatarURL: {
      type: Object,
      default: null,
    },

    location: {
      type: String,
      default: 'planet Earth',
    },

    phone: {
      type: String,
      required: [true, 'Phone is required'],
    },

    birthday: {
      type: Date,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveError);

const registerSchema = joi.object({
  name: joi.string().regex(regexp.name).required().messages({
    'string.name': `{{#label}} must be a valid name`,
    'any.required': `missing required field: {{#label}}`,
  }),
  email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 4 }).required().messages({
    'string.email': `{{#label}} must be a valid email`,
    'any.required': `missing required field: {{#label}}`,
  }),
  password: joi.string().required().messages({
    'string.empty': `{{#label}} cannot be an empty field`,
    'any.required': `missing required field: {{#label}}`,
  }),
  phone: joi.string().regex(regexp.phone).required().messages({
    'string.phone': `{{#label}} cannot be an empty field`,
    'any.required': `missing required field: {{#label}}`,
  }),
  location: joi.string().messages({
    'string.base': `{{#label}} should be a type of 'text'`,
  }),
});

const signInSchema = joi.object({
  email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 4 }).required().messages({
    'string.email': `{{#label}} must be a valid email`,
    'any.required': `missing required field: {{#label}}`,
  }),
  password: joi.string().required().messages({
    'string.empty': `{{#label}} cannot be an empty field`,
    'any.required': `missing required field: {{#label}}`,
  }),
});

const updateSchema = joi.object({
  name: joi.string().messages({
    'string.base': `{{#label}} should be a type of 'text'`,
  }),
  email: joi
    .string()
    .email({ minDomainSegments: 2, maxDomainSegments: 4 })
    .messages({ 'string.email': `{{#label}} must be a valid email` }),
  phone: joi.string().pattern(regexp.phone).messages({
    'string.pattern.base': `{{#label}} with value {:[.]} fails to match the required pattern: {{#regex}}`,
  }),
  birthday: joi.date().messages({
    'string.base': `{{#label}} must be a valid date`,
  }),
  location: joi.string().messages({
    'string.base': `{{#label}} should be a type of 'text'`,
  }),
});

const resendVerifyEmailSchema = joi.object({
  email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 4 }).required().messages({
    'string.email': `{{#label}} must be a valid email`,
    'any.required': `missing required field: {{#label}}`,
  }),
});

const User = model('user', userSchema);

const userSchemas = {
  signInSchema,
  registerSchema,
  updateSchema,
  resendVerifyEmailSchema,
};

module.exports = {
  User,
  userSchemas,
};
