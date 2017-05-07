'use strict';
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("new", {
        title: DataTypes.STRING,
        body: {
            type: DataTypes.STRING
        },
        created: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    })
};