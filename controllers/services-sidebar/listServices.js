const { Services } = require('../../models/services');

const listServices = async (req, res) => {
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Services.find({}, '', {
    skip,
    limit,
  });

  res.json({ data: { services: result } });
};

module.exports = listServices;
