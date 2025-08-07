const { edgeStoreRouter } = require('../config/edgestore');

const uploadProductImages = async (files) => {
  try {
    if (!files || files.length === 0) {
      throw new Error('No files provided');
    }

    const uploadPromises = files.map(async (file, index) => {
      const result = await edgeStoreRouter.productImages.upload({
        file,
        input: {
          type: 'product',
        },
      });

      return {
        url: result.url,
        isPrimary: index === 0 // First image is primary by default
      };
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
};

const deleteProductImage = async (url) => {
  try {
    await edgeStoreRouter.productImages.delete({
      url,
    });
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

const replaceProductImage = async (oldUrl, newFile) => {
  try {
    const result = await edgeStoreRouter.productImages.upload({
      file: newFile,
      input: {
        type: 'product',
      },
      options: {
        replaceTargetUrl: oldUrl,
      },
    });
    return result.url;
  } catch (error) {
    console.error('Error replacing image:', error);
    throw error;
  }
};

module.exports = {
  uploadProductImages,
  deleteProductImage,
  replaceProductImage
};
