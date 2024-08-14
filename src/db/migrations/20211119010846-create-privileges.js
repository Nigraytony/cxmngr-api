'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Privileges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      projectId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      viewProject: {
        type: Sequelize.BOOLEAN
      },
      createProject: {
        type: Sequelize.BOOLEAN
      },
      editProject: {
        type: Sequelize.BOOLEAN
      },
      deleteProject: {
        type: Sequelize.BOOLEAN
      },
      viewIssue: {
        type: Sequelize.BOOLEAN
      },
      createIssue: {
        type: Sequelize.BOOLEAN
      },
      editIssue: {
        type: Sequelize.BOOLEAN
      },
      deleteIssue: {
        type: Sequelize.BOOLEAN
      },
      viewAsset: {
        type: Sequelize.BOOLEAN
      },
      createAsset: {
        type: Sequelize.BOOLEAN
      },
      editAsset: {
        type: Sequelize.BOOLEAN
      },
      deleteAsset: {
        type: Sequelize.BOOLEAN
      },
      viewChecklist: {
        type: Sequelize.BOOLEAN
      },
      createChecklist: {
        type: Sequelize.BOOLEAN
      },
      editChecklist: {
        type: Sequelize.BOOLEAN
      },
      deleteChecklist: {
        type: Sequelize.BOOLEAN
      },
      viewFpt: {
        type: Sequelize.BOOLEAN
      },
      createFpt: {
        type: Sequelize.BOOLEAN
      },
      editFpt: {
        type: Sequelize.BOOLEAN
      },
      deleteFpt: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Privileges');
  }
};