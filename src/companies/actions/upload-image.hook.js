const path = require('path');
const fs = require('fs');
const Adminbro = require('admin-bro');
const { default: AdminBro } = require('admin-bro');

/** @type {AdminBro.After<AdminBro.ActionResponse>} */

const after = async (response, request, context) => {
  const { record, uploadImage } = context;

  if (record.isValid() && uploadImage) {
    const filePath = path.join('uploads', record.id().toString(), uploadImage);
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

    context.uploadImage = uploadImage;

    return {
      ...request,
      payload: otherParams,
    };
  }
  return request;
};

module.exports = { before, after };
