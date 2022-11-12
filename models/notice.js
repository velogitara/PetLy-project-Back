// const fs = require('fs/promises')
const { Schema, model } = require('mongoose');
const joi = require('joi');
const { handleSaveError } = require('../helpers');

const CATEGORIES = ['lost_found', 'sell', 'in_good_hands'];
const SEX = ['male', 'female'];

const noticeSchema = new Schema(
  {
    category: {
      type: String,
      required: [true, 'Set category for notice'],
    },
    title: {
      type: String,
      required: [true, 'Set title for notice'],
      unique: true,
    },

    description: {
      type: String,
      required: [true, 'Set description for notice'],
    },

    name: {
      type: String,
      required: [true, 'Set name for pet'],
    },

    birthday: {
      type: Date,
      default: '0000',
    },

    breed: {
      type: String,
      default: 'outbred',
    },

    location: {
      type: String,
      required: [true, 'Set location'],
    },

    sex: {
      type: String,
      enum: SEX,
      required: [true, 'Set sex'],
    },

    price: {
      type: Number,
      default: null,
    },

    imageURL: {
      type: String,
      default: '',
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },

    favorite: {
      type: Array,
      default: [],
    },
  },
  { versionKey: false, timestamps: true }
);

noticeSchema.post('save', handleSaveError);

const addNoticeSchema = joi.object({
  category: joi
    .string()
    .valid(...CATEGORIES)
    .required()
    .messages({
      'string.base': `{{#label}} should be a type of 'text'`,
      'string.empty': `{{#label}} cannot be an empty field`,
      'string.trim': '{{#label}} must not have leading or trailing whitespace',
      'any.required': `missing required field: {{#label}}`,
    }),
  title: joi.string().required().messages({
    'string.base': `{{#label}} should be a type of 'text'`,
    'string.empty': `{{#label}} cannot be an empty field`,
    'string.trim': '{{#label}} must not have leading or trailing whitespace',
    'any.required': `missing required field: {{#label}}`,
  }),
  description: joi.string().required().messages({
    'string.base': `{{#label}} should be a type of 'text'`,
    'string.empty': `{{#label}} cannot be an empty field`,
    'string.trim': '{{#label}} must not have leading or trailing whitespace',
    'any.required': `missing required field: {{#label}}`,
  }),
  name: joi.string().required().messages({
    'string.base': `{{#label}} should be a type of 'text'`,
    'string.empty': `{{#label}} cannot be an empty field`,
    'string.trim': '{{#label}} must not have leading or trailing whitespace',
    'any.required': `missing required field: {{#label}}`,
  }),
  location: joi.string().required().messages({
    'string.base': `{{#label}} should be a type of 'text'`,
    'string.empty': `{{#label}} cannot be an empty field`,
    'string.trim': '{{#label}} must not have leading or trailing whitespace',
    'any.required': `missing required field: {{#label}}`,
  }),
  sex: joi
    .string()
    .valid(...SEX)
    .required()
    .messages({
      'string.base': `{{#label}} should be a type of 'text'`,
      'string.empty': `{{#label}} cannot be an empty field`,
      'string.trim': '{{#label}} must not have leading or trailing whitespace',
      'any.required': `missing required field: {{#label}}`,
    }),
});

const updateFavoriteSchema = joi.object({
  favorite: joi.bool().required().messages({
    'bool.base': `{{#label}} should be a type of 'boolean'`,
    'any.required': `missing required field: {{#label}}`,
  }),
});

const schemas = { addNoticeSchema, updateFavoriteSchema };
const Notice = model('notice', noticeSchema);

module.exports = { Notice, schemas };
