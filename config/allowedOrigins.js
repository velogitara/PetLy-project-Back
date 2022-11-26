const { PORT } = process.env;
const allowedOrigins = [
  'http://localhost:3000',
  `https://petly-project-goit.herokuapp.com:${PORT}`,
  'https://velogitara.github.io',
];

module.exports = allowedOrigins;
