'use strict';
module.exports = function (sequelize, DataTypes) {
    var Account = sequelize.define('Account', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT,
            field: 'id'
        },
        type: {
            type: DataTypes.BIGINT,
            field: 'Type',
            nullable: true
        }
    }, {
        freezeTableName: true,
        timestamps: false,
        tableName: "Account"
    });

    return Account;
};
