'use strict';
const path = require('path');
const sequelize = require('./dbConnection');
const dotenv = require('dotenv').config();
var models = {};
const modelTables = [
    {
        key: 'Account',
        fileName: 'account'
    }
];

function importModel() {
    modelTables.forEach(table => {
       models[table.key] = sequelize.import(path.join(__dirname, `./${table.fileName}.model`));
    });
    if (dotenv.parsed) {
        process.env.TABLE_NAMES = modelTables.map(v => v.key);
    }
}
importModel();

models.sequelize = sequelize;
module.exports = models;
