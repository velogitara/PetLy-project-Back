const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
// const corsOption = require('./config/corsOption');
const vercelOption = require('./config/verselCORSconfig');

// const fs = require('fs/promises');
// const moment = require('moment');

require('dotenv').config();

// const cloudinary = require('cloudinary').v2;
// console.log(cloudinary.config().cloud_name);

// cloudinary.uploader
//   .upload('./istockphoto-522855255-612x612.jpg', {
//     resource_type: 'image',
//   })
//   .then(res => {
//     console.log('success', JSON.stringify(res, null, 2));
//   });

const { ROUTES } = require('./routes/constants');

const authRouter = require('./routes/api/auth');
const userRouter = require('./routes/api/users');
const noticesRouter = require('./routes/api/notices');
const newsRouter = require('./routes/api/news');
const friendsRouter = require('./routes/api/friends');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors(vercelOption));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

// app.use(async (req, res, next) => {
//   const { method, url } = req;
//   const date = moment().format('DD-MM-YYYY_hh:mm:ss');
//   await fs.appendFile('server.log', `\n${method} ${url} ${date}`);
//   next();
// });

app.use(ROUTES.auth.baseRoute, authRouter);
app.use(ROUTES.users.baseRoute, userRouter);
app.use(ROUTES.notices.baseRoute, noticesRouter);
app.use(ROUTES.news.baseRoute, newsRouter);
app.use(ROUTES.friends.baseRoute, friendsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app;
