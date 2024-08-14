'use strict';

module.exports = function (sequelize, DataTypes) {
  var Projectusers = sequelize.define('Projectusers', {
    userId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER,
    role: DataTypes.STRING,
    // email: DataTypes.STRING,
    // fullName: DataTypes.STRING,
    // company: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});

  Projectusers.associate = function (models) {
    // associations can be defined here
    Projectusers.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    }); // Projectusers.belongsTo(models.Project);
    // Projectusers.belongsTo(models.Contact, {
    //   foreignKey: 'userId',
    //   as: 'contact',
    // });

    Projectusers.belongsTo(models.Project, {
      foreignKey: 'projectId',
      as: 'project'
    });
  };

  return Projectusers;
};