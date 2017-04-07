'use strict';
module.exports = function(sequelize, DataTypes) {
    // const Person = require('./person');
    // const Question = require('./question');
    var Answer = sequelize.define("answer", {
        body: {
            type: DataTypes.STRING
        },
        // question: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: Question,
        //         key: 'id'
        //     }
        // },
        mark: {
            type: DataTypes.DOUBLE
        },
        // author: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: Person,
        //         key: 'id'
        //     }
        // },
        created: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });
    return Answer;
};