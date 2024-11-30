const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      console.log('Found origin');

      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
  // headers: req => {
  //   const origin = req.headers.origin;
  //   if (allowedOrigins.includes(origin)) {
  //     return {
  //       'Access-Control-Allow-Origin': origin, // Dynamically set origin
  //       'Access-Control-Allow-Credentials': 'true',
  //       'Access-Control-Allow-Headers':
  //         'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  //     };
  //   }
  //   return {}; // Return an empty object if the origin is not allowed
  // },
};

// ===========================================================================================================================

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       console.log('Found origin'); // This confirms we are processing the origin correctly
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   optionsSuccessStatus: 200,
// };

module.exports = corsOptions;
