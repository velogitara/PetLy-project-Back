const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');

const { requestError } = require('../../helpers');
const { User } = require('../../models');

const register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw requestError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();
  const result = await User.create({
    name,
    email,
    password: hashPassword,
    phone,
    verificationToken,
  });

  res.status(201).json({
    data: {
      user: {
        name: result.name,
        email: result.email,
        verificationToken,
        phone,
      },
    },
  });
};

module.exports = register;
