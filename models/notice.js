// const fs = require('fs/promises')
const { Schema, model } = require('mongoose');
const joi = require('joi');
const { handleSaveError } = require('../helpers');

const CATEGORIES = ['lost', 'found', 'sell', 'for-free'];
const SEX = ['male', 'female'];

const noticeSchema = new Schema(
  {
    category: {
      type: String,
      enum: CATEGORIES,
      required: [true, 'Set category for notice'],
    },
    title: {
      type: String,
      required: [true, 'Set title for notice'],
    },
    name: {
      type: String,
      default: 'unknown',
    },

    birthday: {
      type: Date,
      default: null,
    },

    breed: {
      type: String,
      default: 'outbreed',
    },

    location: {
      type: String,
      default: 'planet, Earth',
      // required: [true, 'Set location'],
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
      type: Object,
      default: null,
    },

    comments: {
      type: String,
      default: null,
      required: [true, 'Set comments'],
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
  category: joi.string().required().messages({
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
  name: joi.string().messages({
    'string.base': `{{#label}} should be a type of 'text'`,
    'string.trim': '{{#label}} must not have leading or trailing whitespace',
  }),
  breed: joi.string().messages({
    'string.base': `{{#label}} should be a type of 'text'`,
  }),
  birthday: joi.string().messages({
    'string.base': `{{#label}} should be a type of 'text'`,
  }),
  location: joi
    .string()
    //   .required()
    .messages({
      'string.base': `{{#label}} should be a type of 'text'`,
      //   'string.empty': `{{#label}} cannot be an empty field`,
      'string.trim': '{{#label}} must not have leading or trailing whitespace',
      //   'any.required': `missing required field: {{#label}}`,
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
  price: joi.number().messages({
    'number.base': `{{#label}} should be a type of 'number'`,
  }),
  comments: joi.string().required().messages({
    'string.base': `{{#label}} should be a type of 'text'`,
    'string.empty': `{{#label}} cannot be an empty field`,
    'string.trim': '{{#label}} must not have leading or trailing whitespace',
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
