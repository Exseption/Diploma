/**
 * Created by Brainsurgery on 005 05.05.17.
 */

const Sequelize = require('sequelize');
const config = require('./config/config.json');

const sequelize = new Sequelize(config.database, config.username, config.password, config);
const Feedback = sequelize.import('./models/feedback');

sequelize.sync().then(function (success) {
    console.log('All OK')
}, function (err) {
    console.log(' WTF???');
});