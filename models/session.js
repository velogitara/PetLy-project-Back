const { Schema, model, default: mongoose } = require('mongoose');
const { handleSaveError } = require('../helpers');

const sessionSchema = new Schema(
  {
    uid: mongoose.Types.ObjectId,
  },
  { versionKey: false, timestamps: true }
);
sessionSchema.post('save', handleSaveError);

const Session = model('session', sessionSchema);

module.exports = {
  Session,
  sessionSchema,
};
