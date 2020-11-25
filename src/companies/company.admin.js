const { default: AdminBro } = require('admin-bro');
const { Company } = require('./company.entity');

const {
  after: passwordAfterHook,
  before: passwordBeforeHook,
} = require('./actions/password.hook');

/** @type {AdminBro.ResourceOptions} */

const options = {
  properties: {
    encryptedPassword: {
      isVisible: false,
    },
    password: {
      type: 'password',
    },
    profilePhotoLocation: {
      components: {
        edit: AdminBro.bundle('./components/profile-photo-location.edit.tsx'),
      },
    },
  },
  actions: {
    new: {
      after: passwordAfterHook,
      before: passwordBeforeHook,
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
