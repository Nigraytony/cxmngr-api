'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Oprballot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Oprballot.belongsTo(models.User);
      // Oprballot.belongsTo(models.Opr);
      Oprballot.belongsTo(models.Oprquestion);
      Oprballot.belongsTo(models.Oprresponse);
    }
  }
  Oprballot.init({
    userId: DataTypes.INTEGER,
    // oprId: DataTypes.INTEGER,
    oprQuestionId: DataTypes.INTEGER,
    oprResponseId: DataTypes.INTEGER,
    rank: DataTypes.INTEGER,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Oprballot',
  });
  return Oprballot;
};