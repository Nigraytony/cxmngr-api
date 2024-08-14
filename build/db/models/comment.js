'use strict';

module.exports = function (sequelize, DataTypes) {
  var Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    fullName: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    personId: DataTypes.INTEGER,
    issueId: DataTypes.INTEGER,
    assetId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    checklistId: DataTypes.INTEGER,
    fptId: DataTypes.INTEGER,
    submittalId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    comment: DataTypes.TEXT,
    status: DataTypes.BOOLEAN
  }, {});

  Comment.associate = function (models) {
    // associations can be defined here
    Comment.belongsTo(models.Issue, {
      foreignKey: 'issueId',
      as: 'issue'
    });
  };

  return Comment;
};