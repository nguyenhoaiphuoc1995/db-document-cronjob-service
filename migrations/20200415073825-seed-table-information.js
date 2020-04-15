'use strict';
const dummyAccounts = require('../json-files/account.json');
const models = require('../models');
const Account = models['Account'];
module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.createTable('users', { id: Sequelize.INTEGER });
        */
        return Account.bulkCreate(dummyAccounts);
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
       return Promise.resolve();
    }
};
