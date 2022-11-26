const fs = require('fs/promises');
// const path = require('path');
// const jimp = require('jimp');
const { cloudinary } = require('../middlewares');

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
  // const imagesDir = path.join(__dirname, '../', 'public', folder);
  const { path: tempUpload } = file;
  const fileExtension = 'jpg';
  const imageURL = {};

  // console.log(tempUpload);

  try {
    // const image = await jimp.read(tempUpload);

    const resizeImage = async (width, height, filename, fileExtension) => {
      // const resultUpload = path.join(imagesDir, filename);
      // image.cover(width, height).quality(80).write(resultUpload);
      // const picture = await cloudinaryUpload.image(tempUpload, {
      //   gravity: 'face',
      //   height,
      //   width,
      //   crop: 'lfill',
      //   format: fileExtension,
      // });
      // console.log(picture);
      const result = await cloudinary.uploader.upload(tempUpload, {
        public_id: `petly/images/${folder}/${filename}`,
        gravity: 'face',
        height,
        width,
        crop: 'lfill',
        format: fileExtension,
      });
      return result?.url;
    };

    const processImage = async () => {
      const sizes = Object.entries(imageSize[folder]);
      sizes.forEach(async size => {
        const { width, height } = size[1];
        const fileName = `${id}-${width}x${height}.${fileExtension}`;
        const fileNameRetina = `${id}-${width}x${height}@2x.${fileExtension}`;
        const url = await resizeImage(width, height, fileName, fileExtension);
        const urlRetina = await resizeImage(width * 2, height * 2, fileNameRetina, fileExtension);
        imageURL[size[0]] = url;
        imageURL[`${size[0]}_retina`] = urlRetina;
      });

      return imageURL;
    };

    await fs.unlink(tempUpload);
    // console.log(imageURL);
    return await processImage();
  } catch (error) {
    await fs.unlink(file.path);
    throw error;
  }
};

module.exports = imageUploader;
