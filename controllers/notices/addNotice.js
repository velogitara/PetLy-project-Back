const { Notice } = require('../../models/notice');
const { requestError, imageUploader } = require('../../helpers');

const addNotice = async (req, res) => {
  const { _id: owner } = req.user;
  const { file } = req;
  const payload = JSON.parse(req.body.data);
  const { category, price } = payload;
  if (category === 'sell' && !price) {
    throw requestError(400, 'Set price');
  }
  const create = await Notice.create({ ...payload, imageURL: {}, owner });
  const { _id } = create;

  if (!file) {
    res.status(201).json({ data: create });
  }
  const imageURL = await imageUploader('notices', file, _id);

  const result = await Notice.findByIdAndUpdate(_id, { imageURL }, { new: true });

  res.status(201).json({ data: result });
};

module.exports = addNotice;
