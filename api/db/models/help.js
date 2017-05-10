'use strict';
module.exports = function(sequelize, DataTypes) {
    const Help = sequelize.define("help", {
        section: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING
        },
        content: {
            type: DataTypes.TEXT
        }
    });
    return Help;
};