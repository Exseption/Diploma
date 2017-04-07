'use strict';
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("attachment", {
        path: {
            type: DataTypes.STRING
        }
    })
};