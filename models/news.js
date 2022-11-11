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
    data: {
      type: String,
      default: '00/00/0000',
    },
  },
  { versionKey: false, timestamps: true }
);
newsSchema.post('save', handleSaveError);

const joiSchema = Joi.object({
  title: Joi.string().required(),
  article: Joi.string().required(),
  data: Joi.string().required(),
});

// const favoriteSchema = Joi.object({
//   favorite: Joi.bool().required(),
// });

const News = model('news', newsSchema);
const schemas = { joiSchema };

module.exports = {
  News,
  schemas,
};
