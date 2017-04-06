'use strict';
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("attachment", {
        path: {
            type: DataTypes.STRING
        },
        message: {
            type: DataTypes.INTEGER,
            references: {
                model: Message,
                key: 'id'
            }
        }
    })
};