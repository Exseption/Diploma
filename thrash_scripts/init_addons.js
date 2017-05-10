/**
 * Created by Brainsurgery on 005 05.05.17.
 */

const Sequelize = require('sequelize');
const config = require('../api/db/config/config.json');

const sequelize = new Sequelize(config.database, config.username, config.password, config);
// const Feedback = sequelize.import('./models/feedback');

// const Person = sequelize.import('./models/person');
// const New = sequelize.import('./models/new');

const Help = sequelize.import('../api/db/models/help');

// Person.hasMany(New, { foreignKey: 'author' });
// New.belongsTo(Person, { foreignKey:'author' });

sequelize.sync().then(function (success) {

    // New.create( {
    //     title: 'Веб-сервис запущен!',
    //     body: 'Добро пожаловать!',
    //     author: 1
    // });
    // New.create( {
    //     title: 'Первый пользователь!',
    //     body: 'Сегодня зарегистрирован первый пользователь!',
    //     author: 1
    // });

    Help.create({
        section: 'Вопросы',
        title: `Создание вопроса`,
        content: 'Содержимое справки по вопросу'
    });
    Help.create({
        section: 'Ответы',
        title: `Как создать ответ к вопросу`,
        content: 'Содержимое справки по вопросу'
    });
    Help.create({
        section: 'Диалоги',
        title: `Как начать диалог`,
        content: 'Содержимое справки по вопросу'
    });

    console.log('All OK')
}, function (err) {
});


