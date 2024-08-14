'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Projects',{
      id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    img: {
      allowNull: true,
      type: Sequelize.STRING
    },
    title: {
      allowNull: false,
      type: Sequelize.STRING
    },
    subtitle: {
      allowNull: true,
      type: Sequelize.STRING
    },
    projectType: {
      allowNull: false,
      type: Sequelize.STRING
    },
    industry: {
      allowNull: true,
      type: Sequelize.STRING
    },
    client: {
      allowNull: false,
      type: Sequelize.STRING
    },
    location: {
      allowNull: true,
      type: Sequelize.STRING
    },
    buildingType: {
      allowNull: true,
      type: Sequelize.STRING
    },
    startDate: {
      allowNull: true,
      type: Sequelize.DATE
    },
    endDate: {
      allowNull: true,
      type: Sequelize.DATE
    },
    constructionCost: {
      allowNull: true,
      type: Sequelize.DECIMAL
    },
    cxCost: {
      allowNull: true,
      type: Sequelize.DECIMAL
    },
    status: {
      allowNull: true,
      type: Sequelize.STRING
    },
    isActive: {
      allowNull: true,
      type: Sequelize.BOOLEAN
    },
    subscription: {
      allowNull: true,
      type: Sequelize.STRING
    },
    subscriptionEnd: {
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
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Projects');
  }
};
