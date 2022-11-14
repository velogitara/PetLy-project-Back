const { Services } = require('../../models/services');

const addService = async (req, res) => {
  const data = await Services.create(req.body);
  res.status(201).json(data);
};

module.exports = addService;
