const bcrypt = require('bcrypt');

const { requestError } = require('../../helpers');
const { User } = require('../../models');

const register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw requestError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await User.create({
    name,
    email,
    password: hashPassword,
    phone,
  });
  const userId = await User.findOne({ email });

  res.status(201).json({ data: { token: result.token } });
};

module.exports = register;
