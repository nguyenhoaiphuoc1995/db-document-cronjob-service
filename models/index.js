'use strict';

const path = require('path');
const sequelize = require('./dbConnection');
var models = {};

function importModel(fileName) {
    return sequelize.import(path.join(__dirname, `./${fileName}.model`));
}

// import to sequelize
models['Account'] = importModel('account');

//Mapping associate
Object.keys(models).forEach(function (modelName) {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
module.exports = models;
