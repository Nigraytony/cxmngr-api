'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Template extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Template.init({
    projectId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    title: DataTypes.STRING,
    details: DataTypes.TEXT,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Template',
  });
  return Template;
};