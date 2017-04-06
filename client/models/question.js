'use strict';
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("question", {
        title: {
            type: DataTypes.STRING
        },
        body: {
            type: DataTypes.STRING
        },
        author: {
            type: DataTypes.INTEGER,
            references: {
                model: Person,
                key: 'id'
            }
        },
        created: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        payable: {
            type: DataTypes.BOOLEAN
        },
        price: DataTypes.DOUBLE,
        closed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })
};