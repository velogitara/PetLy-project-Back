const { Friend } = require('../../models/friend');

const listFriends = async (req, res) => {
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Friend.find({}, '', {
    skip,
    limit,
  });

  res.json({ data: { friends: result } });
};

module.exports = listFriends;
