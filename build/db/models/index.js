'use strict';

var fs = require('fs');

var path = require('path');

var Sequelize = require('sequelize');

var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development'; // import {}

var config = require("../db.config.js")[env];

var db = {};
var sequelize;
console.log(config);
console.log(env); // sequelize = new Sequelize('postgres://config.development.username:config.development.password@config.development.host:5432/config.development.database');

sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: '/Users/ngray/Code/backend/src/db/cxmngr.db'
});
fs.readdirSync(__dirname).filter(function (file) {
  return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
}).forEach(function (file) {
  // const model = sequelize['import'](path.join(__dirname, file));
  var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);

  db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;