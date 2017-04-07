'use strict';
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("dialog", {
        caption: {
            type: DataTypes.STRING
        },
        started: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    })
};