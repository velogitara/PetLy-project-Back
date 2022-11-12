const fs = require('fs/promises');
const path = require('path');
const jimp = require('jimp');

const imagesDir = {
  avatars: path.join(__dirname, '../', 'public', 'avatars'),
  notices: path.join(__dirname, '../', 'public', 'notices'),
  pets: path.join(__dirname, '../', 'public', 'pets'),
  partners: path.join(__dirname, '../', 'public', 'partners'),
};

const imageURL = {};

const imageSize = {
  avatars: { width: 233, height: 233 },
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

const imageUploader = async (dirName, file, id) => {
  const { path: tempUpload, originalname } = file;
  const fileExtension = originalname.split('.').pop();

  try {
    const image = await jimp.read(tempUpload);

    const resizeImage = (width, height, filename) => {
      const resultUpload = path.join(imagesDir[dirName], filename);
      image.cover(width, height).write(resultUpload);
    };

    switch (dirName) {
      case 'avatars':
        resizeImage(imageSize.avatars.width, imageSize.avatars.height, `${id}.${fileExtension}`);
        imageURL.avatar = path.join('avatars', `${id}.${fileExtension}`);
        break;
      case 'notices':
        resizeImage(
          imageSize.notices.mobile.width,
          imageSize.notices.mobile.height,
          `${id}_${imageSize.notices.mobile.width}.${fileExtension}`
        );
        imageURL.mobile = path.join(
          'notices',
          `${id}_${imageSize.notices.mobile.width}.${fileExtension}`
        );
        resizeImage(
          imageSize.notices.tablet.width,
          imageSize.notices.tablet.height,
          `${id}_${imageSize.notices.tablet.width}.${fileExtension}`
        );
        imageURL.tablet = path.join(
          'notices',
          `${id}_${imageSize.notices.tablet.width}.${fileExtension}`
        );
        resizeImage(
          imageSize.notices.desktop.width,
          imageSize.notices.desktop.height,
          `${id}_${imageSize.notices.desktop.width}.${fileExtension}`
        );
        imageURL.desktop = path.join(
          'notices',
          `${id}_${imageSize.notices.desktop.width}.${fileExtension}`
        );
        break;
      case 'pets':
        resizeImage(
          imageSize.pets.mobile.width,
          imageSize.pets.mobile.height,
          `${id}_${imageSize.pets.mobile.width}.${fileExtension}`
        );
        imageURL.mobile = path.join(
          'pets',
          `${id}_${imageSize.pets.mobile.width}.${fileExtension}`
        );
        resizeImage(
          imageSize.pets.tablet.width,
          imageSize.pets.tablet.height,
          `${id}_${imageSize.pets.tablet.width}.${fileExtension}`
        );
        imageURL.tablet = path.join(
          'pets',
          `${id}_${imageSize.pets.tablet.width}.${fileExtension}`
        );
        resizeImage(
          imageSize.pets.profile.width,
          imageSize.pets.profile.height,
          `${id}_${imageSize.pets.profile.width}.${fileExtension}`
        );
        imageURL.profile = path.join(
          'pets',
          `${id}_${imageSize.pets.profile.width}.${fileExtension}`
        );
        break;
    }

    await fs.unlink(tempUpload);
    console.log(imageURL);
    return imageURL;
  } catch (error) {
    await fs.unlink(file.path);
    throw error;
  }
};

module.exports = imageUploader;
