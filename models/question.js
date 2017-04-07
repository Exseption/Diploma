'use strict';
module.exports = function(sequelize, DataTypes) {
    var Question = sequelize.define("question", {
        title: {
            type: DataTypes.STRING
        },
        body: {
            type: DataTypes.STRING
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
    }
    // ,
    //     {
    //         classMethods: {
    //             associate: function(models) {
    //                 Question.belongsTo(models.Person, {foreignKey: 'author'});
    //             }
    //         }
    //     }
        );
    return Question
};