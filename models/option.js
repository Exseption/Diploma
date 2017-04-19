'use strict';
module.exports = function(sequelize, DataTypes) {
    var Option = sequelize.define("question", {
            show_email: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            show_telephone: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        }
    );
    return Option
};