'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Issues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Projects', key: 'id' },
        onDelete: 'CASCADE',
      },
      number: {
        allowNull: true,
        type: Sequelize.STRING
      },
      title: {
        allowNull: true,
        type: Sequelize.STRING
      },
      activity: {
        allowNull: true,
        type: Sequelize.STRING
      },
      foundDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      foundPerson: {
        allowNull: true,
        type: Sequelize.STRING
      },
      responseDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      responsePerson: {
        allowNull: true,
        type: Sequelize.STRING
      },
      details: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      priority: {
        allowNull: true,
        type: Sequelize.STRING
      },
      status: {
        allowNull: true,
        type: Sequelize.STRING
      },
      closed: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      userId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
      },
      assetId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      checklistId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      fptId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      sitevisitId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      oprId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      eventId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      notes: {
        allowNull: true,
        type: Sequelize.TEXT
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Issues');
  }
};