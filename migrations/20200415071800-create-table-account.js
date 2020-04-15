'use strict';

const tableName = 'Account';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.createTable('users', { id: Sequelize.INTEGER });
        */

        // const isExist = await queryInterface.describeTable(tableName.id);
        // console.log("tableName",tableName);

        try {
            await queryInterface.createTable(tableName, {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.BIGINT
                },
                type: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    field: 'Type'
                }
            });

            await queryInterface.addIndex(
                tableName, {
                name: 'INDEX_ACCOUNT',
                fields: ['id'],
            });

        } catch (error) {
            throw error;
        }
    },

    down: async (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
        try {
            await queryInterface.dropTable(tableName);
        } catch (error) {
            throw error;
        }
    }
};
