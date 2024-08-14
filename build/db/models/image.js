'use strict';

module.exports = function (sequelize, DataTypes) {
  var Image = sequelize.define('Image', {
    projectId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    assetId: DataTypes.INTEGER,
    issueId: DataTypes.INTEGER,
    fptId: DataTypes.INTEGER,
    submittalId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    checklistId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    path: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});

  Image.associate = function (models) {// associations can be defined here
  };

  return Image;
};