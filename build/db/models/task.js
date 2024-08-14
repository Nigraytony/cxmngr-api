'use strict';

module.exports = function (sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    projectId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    wbs: DataTypes.STRING,
    name: DataTypes.STRING,
    start: DataTypes.DATE,
    finish: DataTypes.DATE,
    complete: DataTypes.DECIMAL,
    cost: DataTypes.DECIMAL,
    work: DataTypes.DECIMAL,
    notes: DataTypes.TEXT
  }, {});

  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.Project, {
      foreignKey: 'projectId',
      as: 'project'
    });
    Task.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };

  return Task;
};