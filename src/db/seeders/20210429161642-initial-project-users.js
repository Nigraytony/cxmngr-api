'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      return queryInterface.bulkInsert('Projectusers', [{
        userId: 1,
        projectId: 1,
        role: 'admin'
      },{
        userId: 2,
        projectId: 1,
        role: 'CxA'
      },{
        userId: 3,
        projectId: 1,
        role: 'CxA'
      },{
        userId: 1,
        projectId: 2,
        role: 'admin'
      },{
        userId: 2,
        projectId: 2,
        role: 'CxA'
      },{
        userId: 3,
        projectId: 2,
        role: 'CxA'
      }
    ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:*/
      
    return queryInterface.bulkDelete('Projectusers', null, {});
    
  }
};
