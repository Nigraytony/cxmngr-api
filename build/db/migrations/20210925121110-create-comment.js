'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      contactId: {
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      personId: {
        type: Sequelize.INTEGER
      },
      issueId: {
        type: Sequelize.INTEGER
      },
      assetId: {
        type: Sequelize.INTEGER
      },
      eventId: {
        type: Sequelize.INTEGER
      },
      checklistId: {
        type: Sequelize.INTEGER
      },
      fptId: {
        type: Sequelize.INTEGER
      },
      submittalId: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      comment: {
        type: Sequelize.TEXT
      },
      status: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Comments');
  }
};