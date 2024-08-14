'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Submittals', {
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
      taskId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: 'Tasks', key: 'id' },
        onDelete: 'CASCADE',
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      type: {
        allowNull: true,
        type: Sequelize.STRING
      },
      discipline: {
        allowNull: false,
        type: Sequelize.STRING
      },
      submittalNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      receivedDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      status: {
        allowNull: true,
        type: Sequelize.STRING
      },
      deadline: {
        allowNull: true,
        type: Sequelize.DATE
      },
      details: {
        allowNull: true,
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('Submittals');
  }
};