const getCurrent = async (req, res) => {
  const { name, email, subscription, createdAt } = req.user;
  res.json({
    data: {
      user: {
        name,
        email,
        subscription,
        created: createdAt,
      },
    },
  });
};
module.exports = getCurrent;
