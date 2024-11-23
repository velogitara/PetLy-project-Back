const allowedOrigins = require('./allowedOrigins');

// const corsMiddleware = (req, res, next) => {
//   const origin = req.headers.origin;

//   if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//     console.log('>>>>>>>>>cors middleware triggered');
//     res.setHeader('Access-Control-Allow-Origin', origin || '*');
//     res.setHeader('Access-Control-Allow-Credentials', 'true');
//     res.setHeader(
//       'Access-Control-Allow-Headers',
//       'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//     );
//     res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
//   }

//   next();
// };

const corsMiddleware = (req, res, next) => {
  console.log('Incoming Request:', {
    method: req.method,
    origin: req.headers.origin,
    url: req.url,
  });

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin) || !origin) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  }

  if (req.method === 'OPTIONS') {
    return res.status(204).end(); // Preflight request
  }

  next();
};

module.exports = corsMiddleware;
