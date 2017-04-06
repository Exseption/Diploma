const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:qwerty@localhost:5432/webservice');

const Person = sequelize.import(__dirname + '/client/models/person');
Person.findById(1).then(function (people) {

    console.log(people.dataValues);
});