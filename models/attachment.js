'use strict';
module.exports = function(sequelize, DataTypes) {
    const Message = require('./message');
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