/**
 * Created by Brainsurgery on 005 05.05.17.
 */
'use strict';
module.exports = function(sequelize, DataTypes) {
    const Feedback = sequelize.define("feedback", {
        name: {
            type: DataTypes.STRING
        },
        body: {
            type: DataTypes.STRING
        },
        created: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });
    return Feedback;
};