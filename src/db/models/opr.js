'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Opr extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Opr.belongsTo(models.Project);
      Opr.hasMany(models.Oprquestion, {
        as: 'questions',
      });
    }
  }
  Opr.init({
    projectId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    venue: DataTypes.STRING,
    status: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Opr',
  });
  return Opr;
};