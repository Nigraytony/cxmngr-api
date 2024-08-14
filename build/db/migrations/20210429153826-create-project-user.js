'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Projectusers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      projectId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING
      },
      // email: {
      //   allowNull: true,
      //   type: Sequelize.STRING
      // },
      // fullName: {
      //   allowNull: true,
      //   type: Sequelize.STRING
      // },
      // company: {
      //   allowNull: true,
      //   type: Sequelize.STRING
      // },
      status: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Projectusers');
  }
};