'use strict';
module.exports = function(sequelize, DataTypes) {
    var Answer = sequelize.define("answer", {
        body: {
            type: DataTypes.TEXT
        },
        mark: {
            type: DataTypes.DOUBLE
        },
        blocked: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        created: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });
    return Answer;
};