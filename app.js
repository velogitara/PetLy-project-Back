const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { ROUTES } = require('./routes/constants');

// const authRouter = require('./routes/api/auth');
const noticesRouter = require('./routes/api/notices');
// const newsRouter = require('./routes/api/news');
// const servicesRouter = require('./routes/api/services');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(ROUTES.auth.baseRoute, authRouter);
app.use(ROUTES.notices.baseRoute, noticesRouter);
// app.use(ROUTES.news.baseRoute, newsRouter);
// app.use(ROUTES.services.baseRoute, servicesRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
