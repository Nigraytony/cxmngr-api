'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// import {}
const config = require("../db.config.js")[env];
const db = {};

// let sequelize;
console.log(config);
console.log(env);

// const sequelize = new Sequelize('postgres://postgres:CxM@n@ger020222@localhost:5432/cxmngr_dev');
// const sequelize = new Sequelize('mysql://cxmngradmin:CxM@n@ger020222@localhost:3306/cxmngr_dev');

 const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '/home/ngray/Code/backend/src/db/cxmngr.db',
});


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    // const model = sequelize['import'](path.join(__dirname, file));
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
