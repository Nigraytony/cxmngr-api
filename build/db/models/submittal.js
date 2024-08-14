'use strict';

module.exports = function (sequelize, DataTypes) {
  var Submittal = sequelize.define('Submittal', {
    projectId: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    discipline: DataTypes.STRING,
    submittalNumber: DataTypes.STRING,
    reveivedDate: DataTypes.DATE,
    status: DataTypes.STRING,
    deadline: DataTypes.DATE,
    details: DataTypes.TEXT,
    notes: DataTypes.TEXT
  }, {});

  Submittal.associate = function (models) {
    // associations can be defined here
    Submittal.belongsTo(models.Project, {
      foreignKey: 'projectId',
      as: 'project'
    });
    Submittal.belongsTo(models.Task, {
      foreignKey: 'taskId',
      as: 'task'
    });
  };

  return Submittal;
};