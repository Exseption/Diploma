'use strict';
module.exports = function(sequelize, DataTypes) {
    var Info = sequelize.define("info", {
        descr: {
            type: DataTypes.TEXT
        }
    });
    return Info;
};