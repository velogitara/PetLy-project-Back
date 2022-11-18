const { Schema, model } = require('mongoose');
const { handleSaveError } = require('../helpers');
const { regexp } = require('../helpers');

const friendsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please, provide title for friends'],
    },
    url: {
      type: String,
      default: null,
    },
    addressUrl: {
      type: String,
      default: null,
    },
    imageUrl: {
      type: Object,
      default: null,
    },
    address: {
      type: String,
      required: [true, 'Please, provide address for friends'],
    },
    workDays: {
      type: Array,
      default: [],
    },
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

friendsSchema.post('save', handleSaveError);

const Friends = model('friends', friendsSchema);

module.exports = {
  Friends,
};
