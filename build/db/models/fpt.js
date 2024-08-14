'use strict';

module.exports = function (sequelize, DataTypes) {
  var Fpt = sequelize.define('Fpt', {
    projectId: DataTypes.INTEGER,
    assetId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    title: DataTypes.STRING,
    status: DataTypes.STRING,
    details: DataTypes.TEXT,
    percentComplete: DataTypes.DECIMAL,
    complete: DataTypes.BOOLEAN,
    notes: DataTypes.TEXT
  }, {});

  Fpt.associate = function (models) {
    // associations can be defined here
    Fpt.belongsTo(models.Asset, {
      foreignKey: 'assetId',
      as: 'asset'
    });
    Fpt.belongsTo(models.Project, {
      foreignKey: 'projectId',
      as: 'project'
    });
    Fpt.hasMany(models.Issue, {
      as: 'issues'
    });
  };

  return Fpt;
};