const cloudinary = require('../middlewares/cloudinary');

const imageRemover = async imageURL => {
  const projectFolder = 'petly';
  const files = Object.values(imageURL);
  await Promise.all(
    files.map(
      file =>
        new Promise((resolve, reject) => {
          (async () => {
            const name = file.split(projectFolder).pop().split('.');
            const nameRetinaSafe = name[0].replace('%40', '@');
            try {
              await cloudinary.uploader.destroy(`${projectFolder}${nameRetinaSafe}`, error => {
                if (error) throw error;
                console.log(`${projectFolder}${nameRetinaSafe} removed`);
              });
              resolve();
            } catch (error) {
              console.error(error);
              reject(error);
            }
          })();
        })
    )
  );
};

module.exports = imageRemover;
