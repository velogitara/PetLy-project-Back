const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { requestError } = require('../../helpers');
const { User } = require('../../models');
const { TOKEN_EXPIRES_IN } = process.env;
const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw requestError(409, 'Email in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const createUser = await User.create({
    name,
    email,
    password: hashPassword,
    phone,
  });

  const { _id: userId } = createUser;

  const payload = {
    id: userId,
  };
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: TOKEN_EXPIRES_IN,
  });

  const result = await User.findByIdAndUpdate(userId, { token }, { new: true });
  res.status(201).json({
    data: {
      token: result.token,
    },
  });
};

module.exports = register;
