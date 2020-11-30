const { default: AdminBro } = require('admin-bro');
const { Company } = require('./company.entity');

const {
  after: passwordAfterHook,
  before: passwordBeforeHook,
} = require('./actions/password.hook');

const {
  after: uploadAfterHook,
  before: uploadBeforeHook,
} = require('./actions/upload-image.hook');

/** @type {AdminBro.ResourceOptions} */

const options = {
  properties: {
    encryptedPassword: {
      isVisible: false,
    },
    password: {
      type: 'password',
    },
    uploadImage: {
      components: {
        edit: AdminBro.bundle('./components/upload-image.edit.tsx'),
      },
    },
  },
  actions: {
    new: {
      after: async (response, request, context) => {
        const modifiedResponse = await passwordAfterHook(response, request, context);
        return uploadAfterHook(modifiedResponse, request, context);
      },
      before: async (request, context) => {
        const modifiedRequest = await passwordBeforeHook(request, context);
        return uploadBeforeHook(modifiedRequest, context);
      },
    },
    edit: {
      after: passwordAfterHook,
      before: passwordBeforeHook,
    },
  },
};

module.exports = {
  options,
  resource: Company,
};
