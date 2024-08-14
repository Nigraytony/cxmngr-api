'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Checklistquestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Checklistquestion.belongsTo(models.Checklist, {
      foreignKey: 'checklistId',
      as: 'checklist',
    });
    }
  };
  Checklistquestion.init({
    checklistId: DataTypes.INTEGER,
    questionNumber: DataTypes.INTEGER,
    questionText: DataTypes.STRING,
    answerReview: DataTypes.STRING,
    answerDesign: DataTypes.STRING,
    answerSubmittal: DataTypes.STRING,
    answerDelivered: DataTypes.STRING,
    answerCxa: DataTypes.STRING,
    contractorYesNo: DataTypes.BOOLEAN,
    cxaYesNo: DataTypes.BOOLEAN,
    complete: DataTypes.BOOLEAN,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Checklistquestion',
  });
  return Checklistquestion;
};