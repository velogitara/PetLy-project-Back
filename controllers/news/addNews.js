const { News } = require('../../models/news');

const addNews = async (req, res) => {
  const data = await News.create(req.body);
  res.status(201).json(data);
};

module.exports = addNews;
