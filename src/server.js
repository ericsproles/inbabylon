const express = require('express');
const AdminBro = require('admin-bro');
const mongoose = require('mongoose');
require('dotenv').config();
const options = require('./admin.options');
const buildAdminRouter = require('./admin.router');

const app = express();
const port = 3000;

const run = async () => {
  // CONNECT MONGODB ATLAS
  const connectionString = `mongodb+srv://inbabylon:${process.env.MONGO_PASSWORD}@cluster0.kutiv.mongodb.net/test?retryWrites=true&w=majority`;
  await mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // SETUP ADMINBRO
  const admin = new AdminBro(options);
  const router = buildAdminRouter(admin);
  app.use(admin.options.rootPath, router);

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

module.exports = run;
