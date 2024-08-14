'use strict';

module.exports = function (sequelize, DataTypes) {
  var Privileges = sequelize.define('Privileges', {
    projectId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    viewProject: DataTypes.BOOLEAN,
    createProject: DataTypes.BOOLEAN,
    editProject: DataTypes.BOOLEAN,
    deleteProject: DataTypes.BOOLEAN,
    viewIssue: DataTypes.BOOLEAN,
    createIssue: DataTypes.BOOLEAN,
    editIssue: DataTypes.BOOLEAN,
    deleteIssue: DataTypes.BOOLEAN,
    viewAsset: DataTypes.BOOLEAN,
    createAsset: DataTypes.BOOLEAN,
    editAsset: DataTypes.BOOLEAN,
    deleteAsset: DataTypes.BOOLEAN,
    viewChecklist: DataTypes.BOOLEAN,
    createChecklist: DataTypes.BOOLEAN,
    editChecklist: DataTypes.BOOLEAN,
    deleteChecklist: DataTypes.BOOLEAN,
    viewFpt: DataTypes.BOOLEAN,
    createFpt: DataTypes.BOOLEAN,
    editFpt: DataTypes.BOOLEAN,
    deleteFpt: DataTypes.BOOLEAN
  }, {});

  Privileges.associate = function (models) {// associations can be defined here
  };

  return Privileges;
};