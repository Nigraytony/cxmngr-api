'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    title: DataTypes.STRING,
    company: DataTypes.STRING,
    phone: DataTypes.STRING,
    website: DataTypes.STRING,
    address: DataTypes.TEXT,
    notes: DataTypes.TEXT,
    defaultProject: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    // User.hasOne(models.Contact, {
    //   foreignKey: 'userId',
    //   as: 'contact',
    // });
    User.belongsToMany(models.Project, {
      through: 'Projectusers',
      as: 'user',
      foreignKey: 'userId'
    });
    User.hasMany(models.Task, {
      foreignKey: 'userId',
      as: 'tasks',
    });
    User.hasMany(models.Issue, {
      foreignKey: 'userId',
      as: 'issues',
    });
    User.hasMany(models.Privileges, {
      foreignKey: 'userId',
      as: 'privileges',
    });
  };
  return User;
};
