const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSaveError } = require('../helpers');

const newsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please, provide title for news'],
    },
    article: {
      type: String,
      required: [true, 'Please, provide article for news'],
    },
  },
  { versionKey: false, timestamps: true }
);
newsSchema.post('save', handleSaveError);

const addNewsSchema = Joi.object({
  title: Joi.string().required(),
  article: Joi.string().required(),
});

const News = model('news', newsSchema);
const schemas = { addNewsSchema };

module.exports = {
  News,
  schemas,
};
