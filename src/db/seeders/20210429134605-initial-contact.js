'use strict';
const config = require('../../config');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
      return queryInterface.bulkInsert('Contacts', [{
        userId: 1,
        fullName: 'Nigel Gray',
        title: 'Cx Engineer',
        company: 'Energy Management Consulting LLC',
        phone: "(678) 618-1785",
        website: 'www.energymanagementconsulting.com',
        address: "2050 Buford Hwy, Suite 203, Buford GA 30518",
        notes: "Nigel is a commissioning engineer",
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
      return queryInterface.bulkDelete('Contacts', null, {});
  }
};
