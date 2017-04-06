'use strict';
module.exports = function(sequelize, DataTypes) {
    var Todo = sequelize.define('Todo', {
        title: DataTypes.STRING,
        complete: DataTypes.BOOLEAN
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Todo;
};
