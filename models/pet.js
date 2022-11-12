// const fs = require('fs/promises')
const { Schema, model } = require('mongoose');
const joi = require('joi');
const { handleSaveError, regexp } = require('../helpers');

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for pet'],
      unique: true,
    },

    birthday: {
      type: String,
      match: regexp.birthDate,
      required: [true, 'Set date of birth for pet'],
    },

    breed: {
      type: String,
      required: [true, 'Set breed for pet'],
    },

    imageUrl: {
      type: String,
      default: '',
    },

    comments: {
      type: String,
      default: '',
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

petSchema.post('save', handleSaveError);

const addPetSchema = joi.object({
  name: joi.string().required().messages({
    'string.base': `{{#label}} should be a type of 'text'`,
    'string.empty': `{{#label}} cannot be an empty field`,
    'any.required': `missing required field: {{#label}}`,
  }),
  birthday: joi.string().pattern(regexp.birthDate).required().messages({
    'string.base': `{{#label}} must be a valid date`,
    'string.pattern.base': `{{#label}} with value {:[.]} fails to match the required pattern: dd.mm.yyyy`,
    'any.required': `missing required field: {{#label}}`,
  }),
  breed: joi.string().required().messages({
    'string.base': `{{#label}} should be a type of 'text'`,
    'string.empty': `{{#label}} cannot be an empty field`,
    'any.required': `missing required field: {{#label}}`,
  }),
  comments: joi.string().messages({
    'string.base': `{{#label}} should be a type of 'text'`,
    'string.empty': `{{#label}} cannot be an empty field`,
  }),
});

const updatePetSchema = joi
  .object({
    name: joi.string().messages({
      'string.base': `{{#label}} should be a type of 'text'`,
      'string.empty': `{{#label}} cannot be an empty field`,
    }),
    birthday: joi.string().pattern(regexp.birthDate).messages({
      'string.base': `{{#label}} must be a valid date`,
      'string.pattern.base': `{{#label}} with value {:[.]} fails to match the required pattern: dd.mm.yyyy`,
    }),
    breed: joi.string().messages({
      'string.base': `{{#label}} should be a type of 'text'`,
      'string.empty': `{{#label}} cannot be an empty field`,
    }),
    comments: joi.string().messages({
      'string.base': `{{#label}} should be a type of 'text'`,
      'string.empty': `{{#label}} cannot be an empty field`,
    }),
  })
  .min(1)
  .messages({ 'any.min': 'missing fields' });

const petSchemas = { addPetSchema, updatePetSchema };
const Pet = model('pet', petSchema);

module.exports = { Pet, petSchemas };
