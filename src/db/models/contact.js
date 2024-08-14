'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    userId: DataTypes.INTEGER,
    fullName: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    title: DataTypes.STRING,
    company: DataTypes.STRING,
    phone: DataTypes.STRING,
    website: DataTypes.STRING,
    address: DataTypes.STRING,
    notes: DataTypes.TEXT
  }, {});
  Contact.associate = function(models) {
    // associations can be defined here
    // Contact.belongsTo(models.User, {
    //   foreignKey: 'userId',
    //   as: 'user',
    // });
    // Contact.belongsTo(models.Projectusers, {
    //   foreignKey: 'userId',
    //   as: 'projectuser',
    // });
  };
  return Contact;
};