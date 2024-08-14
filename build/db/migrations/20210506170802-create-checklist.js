'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('Checklists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Checklists',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      assetId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Assets',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      responsible: {
        allowNull: false,
        type: Sequelize.STRING
      },
      details: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      percentComplete: {
        allowNull: true,
        type: Sequelize.DECIMAL
      },
      complete: {
        allowNull: true,
        type: Sequelize.BOOLEAN
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
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Checklists');
  }
};