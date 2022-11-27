const fs = require('fs/promises');
const cloudinary = require('../middlewares/cloudinary');

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
  const { path: tempUpload } = file;
  const fileExtension = 'jpg';
  const imageURL = {};

  const resizeImage = async ({ width, height, fileName, fileExtension, name }) => {
    try {
      const result = await cloudinary.uploader.upload(tempUpload, {
        public_id: `petly/images/${folder}/${fileName}`,
        gravity: 'face',
        height,
        width,
        crop: 'lfill',
        format: fileExtension,
      });
      imageURL[name] = result?.secure_url ?? '';
      // console.log(imageURL);
      // return result;
    } catch (error) {
      console.log(error);
    }
  };

  const processImage = async () => {
    const sizes = Object.entries(imageSize[folder]);
    const result = await Promise.all(
      sizes.map(
        ([name, size]) =>
          new Promise((resolve, reject) => {
            try {
              const { width, height } = size;
              const fileName = `${id}-${width}x${height}`;
              const fileNameRetina = `${id}-${width}x${height}@2x`;
              const nameRetina = `${name}_retina`;
              resizeImage({ width, height, fileName, fileExtension, name });
              resizeImage({
                width: width * 2,
                height: height * 2,
                fileName: fileNameRetina,
                fileExtension,
                name: nameRetina,
              });
              resolve();
            } catch (error) {
              reject(error);
            }
          })
      )
    ).then(() => imageURL);

    console.log('imageURL before return:', result);
    return result;
  };

  try {
    return await processImage();

    // await fs.unlink(tempUpload);
    // console.log(result);
    // return result;
  } catch (error) {
    await fs.unlink(file.path);
    throw error;
  }
};

module.exports = imageUploader;
