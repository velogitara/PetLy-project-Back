const getCurrent = async (req, res) => {
  const { name, email, birthday, phone, location, createdAt } = req.user;
  res.json({
    data: {
      user: {
        name,
        email,
        birthday,
        phone,
        location,
        created: createdAt,
      },
    },
  });
};
module.exports = getCurrent;
