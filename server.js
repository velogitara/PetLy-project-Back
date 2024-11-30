const app = require('./app');
const mongoose = require('mongoose');
const { PORT = 3001, DB_HOST } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log(`Database connection successful`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
});

// mongoose
//   .connect(DB_HOST)
//   .then(console.log('Database connection successful'))
//   .catch(({ message }) => {
//     console.log(message);
//     process.exit(1);
//   });

// app.listen(PORT, () => {
//   console.log(`Server running. Use our API on port: ${PORT}`);
// });
module.exports = app;
