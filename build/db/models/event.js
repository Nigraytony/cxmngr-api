'use strict';

module.exports = function (sequelize, DataTypes) {
  var Event = sequelize.define('Event', {
    projectId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    taskId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    status: DataTypes.STRING,
    date: DataTypes.DATE,
    details: DataTypes.TEXT,
    notes: DataTypes.TEXT
  }, {});

  Event.associate = function (models) {
    // associations can be defined here
    Event.belongsTo(models.Project, {
      foreignKey: 'projectId',
      as: 'project'
    });
    Event.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    Event.belongsTo(models.Task, {
      foreignKey: 'taskId',
      as: 'task'
    });
    Event.hasMany(models.Issue, {
      as: 'issues'
    });
  };

  return Event;
};