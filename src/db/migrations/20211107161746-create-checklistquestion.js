'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Checklistquestions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      checklistId: {
        type: Sequelize.INTEGER
      },
      questionNumber: {
        type: Sequelize.INTEGER
      },
      questionText: {
        type: Sequelize.STRING
      },
      answerReview: {
        type: Sequelize.STRING
      },
      answerDesign: {
        type: Sequelize.STRING
      },
      answerSubmittal: {
        type: Sequelize.STRING
      },
      answerDelivered: {
        type: Sequelize.STRING
      },
      answerCxa: {
        type: Sequelize.STRING
      },
      contractorYesNo: {
        type: Sequelize.BOOLEAN
      },
      cxaYesNo: {
        type: Sequelize.BOOLEAN
      },
      complete: {
        type: Sequelize.BOOLEAN
      },
      notes: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Checklistquestions');
  }
};