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
      default: '00.00.0000',
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
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSaveError);

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

const resendVerifyEmailSchema = joi.object({
  email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 4 }).required().messages({
    'string.email': `{{#label}} must be a valid email`,
    'any.required': `missing required field: {{#label}}`,
  }),
});

const schemas = {
  signInSchema,
  resendVerifyEmailSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
