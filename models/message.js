'use strict';
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("message", {
        body: {
            type: DataTypes.STRING
        },
        created: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    })
};