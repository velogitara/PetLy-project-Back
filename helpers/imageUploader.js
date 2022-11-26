const fs = require('fs/promises');
const path = require('path');
const jimp = require('jimp');

const imageSize = {
  avatars: { profile: { width: 233, height: 233 } },
  notices: {
    mobile: {
      width: 280,
      height: 288,
    },
    tablet: {
      width: 336,
      height: 288,
    },
    desktop: {
      width: 288,
      height: 288,
    },
    profile: {
      width: 288,
      height: 328,
    },
    profileMobile: {
      width: 240,
      height: 240,
    },
  },
  pets: {
    mobile: {
      width: 240,
      height: 240,
    },
    tablet: {
      width: 161,
      height: 161,
    },
    profile: {
      width: 288,
      height: 328,
    },
  },
};

const imageUploader = async (folder, file, id) => {
  const imagesDir = path.join(__dirname, '../', 'public', folder);
  const { path: tempUpload } = file;
  const fileExtension = 'jpg';
  const imageURL = {};

  try {
    const image = await jimp.read(tempUpload);

    const resizeImage = (width, height, filename) => {
      const resultUpload = path.join(imagesDir, filename);
      image.cover(width, height).quality(80).write(resultUpload);
    };

    const processImage = () => {
      const sizes = Object.entries(imageSize[folder]);
      sizes.forEach(size => {
        const { width, height } = size[1];
        const fileName = `${id}-${width}x${height}.${fileExtension}`;
        const fileNameRetina = `${id}-${width}x${height}@2x.${fileExtension}`;
        resizeImage(width, height, fileName);
        resizeImage(width * 2, height * 2, fileNameRetina);
        imageURL[size[0]] = path.join(folder, fileName);
        imageURL[`${size[0]}_retina`] = path.join(folder, fileNameRetina);
      });

      return imageURL;
    };

    await fs.unlink(tempUpload);
    console.log(imageURL);
    return processImage();
  } catch (error) {
    await fs.unlink(file.path);
    throw error;
  }
};

module.exports = imageUploader;
