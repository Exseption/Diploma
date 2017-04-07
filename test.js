const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:qwerty@localhost:5432/webservice2');

const Person = sequelize.import(__dirname + '/models/person');
const Question = sequelize.import(__dirname + '/models/question');
const Answer = sequelize.import(__dirname + '/models/answer');

Question.belongsTo(Person, {foreignKey: 'author'});
Answer.belongsTo(Question, {foreignKey: 'author'});
Answer.belongsTo(Person, {foreignKey: 'answer'});

sequelize.sync({force: true});
console.log('OK');
