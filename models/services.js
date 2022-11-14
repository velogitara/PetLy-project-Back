const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSaveError } = require('../helpers');
const { regexp } = require('../helpers');

const servicesSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please, provide title for news'],
    },
    url: {
      type: String,
    },
    addressUrl: {
      type: String,
    },
    imageUrl: {
      type: Object,
      default: null,
    },
    address: {
      type: String,
      required: [true, 'Please, provide article for news'],
    },
    workDays: {},
    phone: {
      type: String,
      required: [true, 'Phone is required'],
    },
    email: {
      type: String,
      match: regexp.email,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
    },
  },
  { versionKey: false, timestamps: true }
);

servicesSchema.post('save', handleSaveError);

const addServicesSchema = Joi.object({
  title: Joi.string().required(),
  url: Joi.string().required(),
  description: Joi.string().required(),
});

const Services = model('services', servicesSchema);
const schemas = { addServicesSchema };

module.exports = {
  Services,
  schemas,
};
