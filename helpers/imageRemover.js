const fs = require('fs/promises');
const path = require('path');

const imageRemover = async imageURL => {
  const pathToClean = path.join(__dirname, '../', 'public');

  const files = Object.values(imageURL);

  await Promise.all(
    files.map(
      file =>
        new Promise((resolve, reject) => {
          try {
            fs.unlink(path.join(pathToClean, file), err => {
              if (err) throw err;
              console.log(`${file} was deleted`);
              resolve();
            });
          } catch (err) {
            console.error(err);
            reject(err);
          }
        })
    )
  );
};

module.exports = imageRemover;
