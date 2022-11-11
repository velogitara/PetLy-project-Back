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
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    avatarURL: { type: String },

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
      default: '',
    },

    myPets: {
      type: Array,
      default: [],
    },

    favorites: {
      type: Array,
      default: [],
    },

    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: '',
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

const updateSchema = joi
  .object({
    name: joi.string().messages({
      'string.base': `{{#label}} should be a type of 'text'`,
      'string.empty': `{{#label}} cannot be an empty field`,
    }),
    email: joi
      .string()
      .email({ minDomainSegments: 2, maxDomainSegments: 4 })
      .messages({ 'string.email': `{{#label}} must be a valid email` }),
    phone: joi.string().pattern(regexp.phone).messages({
      'string.pattern.base': `{{#label}} with value {:[.]} fails to match the required pattern: {{#regex}}`,
    }),
    favorite: joi.bool().messages({ 'bool.base': `{{#label}} should be a type of 'boolean'` }),
  })
  .min(1)
  .messages({ 'any.min': 'missing fields' });

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
