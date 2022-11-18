const { Schema, model } = require('mongoose');
const joi = require('joi');
const { handleSaveError } = require('../helpers');
const format = require('date-format');

const newsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please, provide title for news'],
    },
    url: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      required: [true, 'Please, provide article for news'],
    },
    data: {
      type: String,
      default: () => format('dd/MM/yyyy', new Date()),
    },
  },
  { versionKey: false, timestamps: true }
);
newsSchema.post('save', handleSaveError);

const addNewsSchema = joi.object({
  title: joi.string().required().messages({
    'string.base': `{{#label}} should be a type of 'text'`,
    'string.empty': `{{#label}} cannot be an empty field`,
    'string.trim': '{{#label}} must not have leading or trailing whitespace',
    'any.required': `missing required field: {{#label}}`,
  }),
  url: joi.string().required(),
  description: joi.string().required().messages({
    'string.base': `{{#label}} should be a type of 'text'`,
    'string.empty': `{{#label}} cannot be an empty field`,
    'string.trim': '{{#label}} must not have leading or trailing whitespace',
    'any.required': `missing required field: {{#label}}`,
  }),
});

const News = model('news', newsSchema);
const schemas = { addNewsSchema };

module.exports = {
  News,
  schemas,
};
