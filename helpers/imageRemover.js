// const cloudinary = require('../middlewares/cloudinary');

const imageRemover = async imageURL => {
  // const files = Object.values(imageURL);
  // await Promise.all(
  //   files.map(
  //     file =>
  //       new Promise((resolve, reject) => {
  //         (async () => {
  //           const name = file.split('.').pop();
  //           try {
  //             await cloudinary.uploader.destroy(name, function (result) {
  //               console.log(result);
  //             });
  //           } catch (error) {
  //             console.error(error);
  //             reject(error);
  //           }
  //         })();
  //       })
  //   )
  // );
};

module.exports = imageRemover;
