'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Oprresponse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Oprresponse.belongsTo(models.Oprquestion);
      Oprresponse.hasMany(models.Oprballot, {
        as: 'oprballots',
      });
    }
  }
  Oprresponse.init({
    oprQuestionId: DataTypes.INTEGER,
    responseTag: DataTypes.STRING,
    responsePerson: DataTypes.INTEGER,
    responseText: DataTypes.STRING,
    combineWith: DataTypes.STRING,
    score: DataTypes.DECIMAL,
    rank: DataTypes.INTEGER,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Oprresponse',
  });
  return Oprresponse;
};