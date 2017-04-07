'use strict';
module.exports = function(sequelize, DataTypes) {
    const Person = require('./person');
    var Question = sequelize.define("question", {
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
    }
    // ,
    //     {
    //         classMethods: {
    //             associate: function(models) {
    //                 Question.belongsTo(models.Person);
    //             }
    //         }
    //     }
        );
    return Question
};
//
// module.exports = function(sequelize, DataTypes) {
//     var User = sequelize.define('User', {
//         email: DataTypes.STRING
//     }, {
//         classMethods: {
//             associate: function(models) {
//                 User.hasMany(models.Todo);
//             }
//         }
//     });
//     return User;
// };
