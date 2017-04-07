'use strict';
module.exports = function(sequelize, DataTypes) {
    const Person = sequelize.define("person", {
        login: {         type: DataTypes.STRING        },
        password: {            type: DataTypes.STRING        },
        name: {            type: DataTypes.STRING        },
        surname: {            type: DataTypes.STRING        },
        telephone: {            type: DataTypes.BIGINT        },
        birthday: {            type: DataTypes.DATE        },
        registrated: {            type: DataTypes.DATE,            defaultValue: DataTypes.NOW        },
        rating: {            type: DataTypes.DOUBLE        },
        active: {            type: DataTypes.BOOLEAN,            defaultValue: true        },
        usergroup: {            type:DataTypes.ENUM('admin','user'),            defaultValue: 'user'        },
        country: {            type: DataTypes.STRING        },
        area: {            type: DataTypes.STRING        },
        city: {            type: DataTypes.STRING        }
    }
    // ,
    //     {
    //         classMethods: {
    //             associate: function(models) {
    //                 Person.hasMany(models.Question);
    //             }
    //         }
    //     }
        );
    return Person
};