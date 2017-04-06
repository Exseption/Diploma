'use strict';
module.exports = function(sequelize, DataTypes) {
    const Person = require('./person');
    return sequelize.define("dialog", {
        sender: {
            type: DataTypes.INTEGER,
            references: {
                model: Person,
                key: 'id'
            }
        },
        destination: {
            type: DataTypes.INTEGER,
            references: {
                model: Person,
                key: 'id'
            }
        },
        caption: {
            type: DataTypes.STRING
        },
        started: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    })
};