'use strict';
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("book", {
        title: {
            type: Sequelize.STRING
        },
        author: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        path: {
            type: Sequelize.STRING
        }
    })
};