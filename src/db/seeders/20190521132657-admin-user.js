'use strict';
const bcrypt = require("bcrypt");
const config = require("../../config");

module.exports = {
    up: (queryInterface, Sequelize) => {
        let hash1 = bcrypt.hashSync(config.admin_pass, config.bcrypt.saltRounds);
        let hash2 = bcrypt.hashSync('password', config.bcrypt.saltRounds);

        return queryInterface.bulkInsert('Users', [
            {
                email: 'admin@flatlogic.com',
                password: hash1,
                defaultProject: 1,
                fullName: 'Cx Admin',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'ngray@cxmngr.com',
                password: hash2,
                fullName: 'Nigel Gray',
                defaultProject: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                email: 'ameacham@cxmngr.com',
                password: hash2,
                fullName: 'Abbi Meacham',
                defaultProject: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
