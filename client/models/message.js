'use strict';
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("message", {
        body: {
            type: DataTypes.STRING
        },
        created: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        dialog: {
            type: DataTypes.INTEGER,
            references: {
                model: Dialog,
                key: 'id'
            }
        },
        sended_by: {
            type: DataTypes.INTEGER,
            references: {
                model: Person,
                key: 'id'
            }
        }
    })
};