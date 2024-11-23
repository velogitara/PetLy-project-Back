const allowedOrigins = require('./allowedOrigins');

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS 1'));
//     }
//   },
//   credentials: true,
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   optionsSuccessStatus: 200,
//   headers: req => {
//     const origin = req.headers.origin;
//     if (allowedOrigins.includes(origin)) {
//       return {
//         'Access-Control-Allow-Origin': origin, // Dynamically set origin
//         'Access-Control-Allow-Credentials': 'true',
//         'Access-Control-Allow-Headers':
//           'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
//       };
//     }
//     return {}; // Return an empty object if the origin is not allowed
//   },
// };

const corsOptions = (req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    return next();
  }

  res.status(403).send('Not allowed by CORS');
};

module.exports = corsOptions;
