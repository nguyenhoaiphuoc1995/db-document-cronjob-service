'use strict';
module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define('Post', {
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
        tableName: "Post"
    });

    return Post;
};
