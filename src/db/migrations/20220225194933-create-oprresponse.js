'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Oprresponses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      oprQuestionId: {
        type: Sequelize.INTEGER
      },
      responseTag: {
        type: Sequelize.STRING
      },
      responsePerson: {
        type: Sequelize.INTEGER
      },
      responseText: {
        type: Sequelize.STRING
      },
      combineWith: {
        type: Sequelize.STRING
      },
      score: {
        type: Sequelize.DECIMAL
      },
      rank: {
        type: Sequelize.INTEGER
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Oprresponses');
  }
};