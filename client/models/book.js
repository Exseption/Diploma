'use strict';
module.exports = function(sequelize, DataTypes) {


    return sequelize.define("book", {
        title: {
            type: DataTypes.STRING
        },
        author: {
            type: DataTypes.STRING
        },
        category: {
            type: DataTypes.STRING
        },
        path: {
            type: DataTypes.STRING
        }
    })
};