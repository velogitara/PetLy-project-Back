const { News } = require('../../models/news');

const addNews = async (req, res) => {
  const { _id: owner } = req.user;
  const data = await News.create({ ...req.body, owner });
  res.status(201).json(data);
};

module.exports = addNews;
