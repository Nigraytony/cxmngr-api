'use strict';
module.exports = (sequelize, DataTypes) => {
  const Issue = sequelize.define('Issue', {
    projectId: DataTypes.INTEGER,
    number: DataTypes.STRING,
    title: DataTypes.STRING,
    activity: DataTypes.STRING,
    foundDate: DataTypes.DATE,
    foundPerson: DataTypes.STRING,
    responseDate: DataTypes.DATE,
    responsePerson: DataTypes.STRING,
    details: DataTypes.TEXT,
    priority: DataTypes.STRING,
    status: DataTypes.STRING,
    closed: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    assetId: DataTypes.INTEGER,
    checklistId: DataTypes.INTEGER,
    fptId: DataTypes.INTEGER,
    sitevisitId: DataTypes.INTEGER,
    oprId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    notes: DataTypes.TEXT
  }, {});
  Issue.associate = function(models) {
    // associations can be defined here
    Issue.belongsTo(models.Project);
    Issue.belongsTo(models.User);
    Issue.belongsTo(models.Checklist,{
      foreignKey: 'checklistId',
      as: 'issues',
    });
    Issue.belongsTo(models.Event,{
      foreignKey: 'eventId',
      as: 'event',
    });
    Issue.belongsTo(models.Fpt,{
      foreignKey: 'fptId',
      as: 'fpt',
    });
    Issue.hasMany(models.Comment, {
      as: 'comments',
    });
    Issue.hasMany(models.Image, {
      as: 'images',
    });
  };
  return Issue;
};