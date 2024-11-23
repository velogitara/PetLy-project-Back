require('dotenv').config();

const { BASE_URL = 'http://localhost', PORT = 3000 } = process.env;

const createVerifyEmail = (email, verificationToken) => {
  console.log(verificationToken);
  const mail = {
    to: email,
    subject: 'Confirm your registration',
    html: `<a target="_blanc" href="${BASE_URL}:${PORT}/api/users/verify/${verificationToken}">Click to verify your registration</a>`,
  };
  return mail;
};

module.exports = createVerifyEmail;
