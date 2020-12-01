const path = require('path');
const fs = require('fs');
const AdminBro = require('admin-bro');

/** @type {AdminBro.After<AdminBro.ActionResponse>} */
const after = async (response, request, context) => {
  const { record, uploadImage } = context;
  console.log('context:', context);

  if (record.isValid() && uploadImage) {
    console.log('uploadImage inside if statement:', uploadImage);
    console.log('record: ', record);
    const filePath = path.join('uploads', 'images', uploadImage.name);
    await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

    await fs.promises.rename(uploadImage.path, filePath);

    await record.update({ profilePhotoLocation: `/${filePath}` });
  }
  return response;
};

/** @type {AdminBro.Before} */
const before = async (request, context) => {
  if (request.method === 'post') {
    const { uploadImage, ...otherParams } = request.payload;

    // eslint-disable-next-line no-param-reassign
    context.uploadImage = uploadImage;

    return {
      ...request,
      payload: otherParams,
    };
  }
  return request;
};

module.exports = { after, before };
