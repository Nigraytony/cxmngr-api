'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    img: DataTypes.STRING,
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    projectType: DataTypes.STRING,
    industry: DataTypes.STRING,
    client: DataTypes.STRING,
    location: DataTypes.STRING,
    buildingType: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    constructionCost: DataTypes.DECIMAL,
    cxCost: DataTypes.DECIMAL,
    status: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    subscription: DataTypes.STRING,
    subscriptionEnd: DataTypes.DATE,
    notes: DataTypes.TEXT,
  }, {});
  Project.associate = function(models) {
    // associations can be defined here
    Project.belongsToMany(models.User, {
      through: 'Projectuser',
      as: 'projects',
      foreignKey: 'projectId'
    });
    Project.hasMany(models.Issue, {
      foreignKey: 'projectId'
    });
    Project.hasMany(models.Checklist, {
      foreignKey: 'projectId'
    });
    Project.hasMany(models.Fpt, {
      foreignKey: 'projectId'
    });
    Project.hasMany(models.Opr, {
      foreignKey: 'projectId'
    });
  };
  return Project;
};