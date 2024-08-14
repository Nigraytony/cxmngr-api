'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Assets', {
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
      tag: {
        allowNull: false,
        type: Sequelize.STRING
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      system: {
        allowNull: false,
        type: Sequelize.STRING
      },
      equipmentType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      location: {
        allowNull: true,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      delivered: {
        allowNull: true,
        type: Sequelize.DATE
      },
      installed: {
        allowNull: true,
        type: Sequelize.DATE
      },
      startup: {
        allowNull: true,
        type: Sequelize.DATE
      },
      tested: {
        allowNull: true,
        type: Sequelize.DATE
      },
      trained: {
        allowNull: true,
        type: Sequelize.DATE
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
    return queryInterface.dropTable('Assets');
  }
};