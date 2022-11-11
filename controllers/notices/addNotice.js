const { Notice } = require('../../models/notice');

const addNotice = async (req, res) => {
  const { _id: owner } = req.user;
  await Notice.create({ ...req.body, owner });

  res.status(201).json({ message: 'Notice successfuly created' });
};

module.exports = addNotice;
