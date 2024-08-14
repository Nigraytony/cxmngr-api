'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Oprquestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Oprquestion.belongsTo(models.Opr);
      Oprquestion.hasMany(models.Oprresponse, {
        as: 'oprresponses',
      });
      Oprquestion.hasMany(models.Oprballot, {
        as: 'oprballots',
      });
    }
  }
  Oprquestion.init({
    oprId: DataTypes.INTEGER,
    questionTag: DataTypes.STRING,
    questionText: DataTypes.TEXT,
    status: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Oprquestion',
  });
  return Oprquestion;
};