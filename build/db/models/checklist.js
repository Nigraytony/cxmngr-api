'use strict';

module.exports = function (sequelize, DataTypes) {
  var Checklist = sequelize.define('Checklist', {
    projectId: DataTypes.INTEGER,
    assetId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    title: DataTypes.STRING,
    status: DataTypes.STRING,
    responsible: DataTypes.STRING,
    details: DataTypes.TEXT,
    percentComplete: DataTypes.DECIMAL,
    complete: DataTypes.BOOLEAN,
    notes: DataTypes.TEXT
  }, {});

  Checklist.associate = function (models) {
    // associations can be defined here
    Checklist.belongsTo(models.Asset, {
      foreignKey: 'assetId',
      as: 'asset'
    });
    Checklist.belongsTo(models.Project, {
      foreignKey: 'projectId',
      as: 'project'
    });
    Checklist.hasMany(models.Issue, {
      as: 'issues'
    });
    Checklist.hasMany(models.Checklistquestion, {
      as: 'questions'
    });
  };

  return Checklist;
};