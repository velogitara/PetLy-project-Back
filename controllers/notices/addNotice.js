const { Notice } = require('../../models/notice');
const { requestError, imageUploader } = require('../../helpers');

const addNotice = async (req, res) => {
  const { _id: owner } = req.user;
  const { file } = req;
  const payload = req.body.data ? JSON.parse(req.body.data) : req.body;
  const { category, price } = payload;
  if (category === 'sell' && !price) {
    throw requestError(400, 'Set price');
  }
  const create = await Notice.create({ ...payload, imageURL: null, owner });
  const { _id } = create;

  if (!file) {
    res.status(201).json({ data: create });
    return;
  }

  const imageURL = await imageUploader('notices', file, _id);
  await Notice.findByIdAndUpdate(_id, { imageURL }, { new: true }).then(result =>
    res.status(201).json({ data: result })
  );
};

module.exports = addNotice;
