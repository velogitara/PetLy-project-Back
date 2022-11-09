// const fs = require('fs/promises')
const { Schema, model } = require('mongoose');
const joi = require('joi');
const { handleSaveError } = require('../helpers');
const { regexp } = require('../helpers');

const noticeSchema = new Schema({
  category: {
    type: String,
    required: [true, 'Set category for notice'],
  },
  title: {
    type: String,
    required: [true, 'Please, provide title for notice'],
  },

  description: {
    type: String,
    required: [true, 'Please, provide description for notice'],
  },

  name: {
    type: String,
    required: [true, 'Set name for pet'],
  },

  birthday: {
    type: Date,
    default: '00.00.0000',
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
    enum: ['male', 'femail'],
    required: [true, 'Set sex'],
  },

  price: {
    type: Number,
    default: 0,
  },

  imageURL: {
    type: String,
    default: '',
  },

  comments: {
    type: String,
    default: '',
  },

  email: {
    type: String,
    match: regexp.email,
  },
  phone: {
    type: String,
  },
  // owner: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'user',
  // },
});

noticeSchema.post('save', handleSaveError);

const addSchema = joi.object({
  name: joi.string().required().messages({
    'string.base': `{{#label}} should be a type of 'text'`,
    'string.empty': `{{#label}} cannot be an empty field`,
    'any.required': `missing required field: {{#label}}`,
  }),
  email: joi.string().email({ minDomainSegments: 2, maxDomainSegments: 4 }).required().messages({
    'string.email': `{{#label}} must be a valid email`,
    'any.required': `missing required field: {{#label}}`,
  }),
  phone: joi.string().pattern(regexp.phone).required().messages({
    'string.empty': `{{#label}} cannot be an empty field`,
    'string.pattern.base': `{{#label}} with value {:[.]} fails to match the required pattern: {{#regex}}`,
    'any.required': `missing required field: {{#label}}`,
  }),
});

const schemas = { addSchema };
const Notice = model('notice', noticeSchema);

module.exports = { Notice, schemas };
