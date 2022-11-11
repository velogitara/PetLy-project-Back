const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSaveError } = require('../helpers');
const format = require('date-format');

console.log(format('dd/MM/yyyy', new Date()));

const newsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please, provide title for news'],
    },
    url: {
      type: String,
      required: [true, 'Please, provide'],
    },
    description: {
      type: String,
      required: [true, 'Please, provide article for news'],
    },
    date: {
      type: String,
      default: () => format('dd/MM/yyyy', new Date()),
    },
  },
  { versionKey: false }
);
newsSchema.post('save', handleSaveError);

const addNewsSchema = Joi.object({
  title: Joi.string().required(),
  url: Joi.string().required(),
  description: Joi.string().required(),
});

const News = model('news', newsSchema);
const schemas = { addNewsSchema };

module.exports = {
  News,
  schemas,
};
