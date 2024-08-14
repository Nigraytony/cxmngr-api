'use strict';

module.exports = function (sequelize, DataTypes) {
  var Asset = sequelize.define('Asset', {
    projectId: DataTypes.INTEGER,
    tag: DataTypes.STRING,
    title: DataTypes.STRING,
    system: DataTypes.STRING,
    equipmentType: DataTypes.STRING,
    location: DataTypes.STRING,
    status: DataTypes.STRING,
    delivered: DataTypes.DATE,
    installed: DataTypes.DATE,
    startup: DataTypes.DATE,
    tested: DataTypes.DATE,
    trained: DataTypes.DATE,
    complete: DataTypes.DECIMAL,
    notes: DataTypes.TEXT
  }, {});

  Asset.associate = function (models) {
    // associations can be defined here
    Asset.belongsTo(models.Project, {
      foreignKey: 'projectId',
      as: 'project'
    });
    Asset.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
    Asset.hasMany(models.Checklist, {
      as: 'checklists'
    });
    Asset.hasMany(models.Fpt, {
      as: 'fpts'
    });
    Asset.hasMany(models.Issue, {
      as: 'issues'
    });
  };

  return Asset;
};