const Sequelize = require('sequelize');
const config = require('./config/config.json');
const sequelize = new Sequelize(config.database, config.username, config.password, config);



const Person = sequelize.import(__dirname + '/models/person');
const Question = sequelize.import(__dirname + '/models/question');
const Answer = sequelize.import(__dirname + '/models/answer');
const Dialog = sequelize.import(__dirname + '/models/dialog');
const Message = sequelize.import(__dirname + '/models/message');
const Book = sequelize.import(__dirname + '/models/book');
const Attachment = sequelize.import(__dirname + '/models/attachment');

Question.belongsTo(Person, {foreignKey: 'author'});
Answer.belongsTo(Question, {foreignKey: 'to_question'});
Answer.belongsTo(Person, {foreignKey: 'author'});
Message.belongsTo(Dialog, {foreignKey: 'of_dialog'});
Message.belongsTo(Person, {foreignKey: 'sended_by'});
Dialog.belongsTo(Person,{foreignKey: 'sender'});
Dialog.belongsTo(Person,{foreignKey: 'destination'});
Attachment.belongsTo(Message, {foreignKey: 'to_message'});

sequelize.sync(
    {force: true}
).then(function () {
    Book.create({
        title: 'Конституция РФ',
        author: null,
        category: 'Законодательства',
        path: '/uploads/library/const.pdf'
    });
    Book.create({
        title: 'Уголовный кодекс',
        author: null,
        category: 'Законодательства РФ',
        path: '/uploads/library/uk.pdf'
    });
    Book.create({
        title: 'Семейный кодекс РФ',
        author: null,
        category: 'Законодательства',
        path: '/uploads/library/sem.pdf'
    });
    Book.create({
        title: 'Кодекс об административных правонарушениях',
        author: null,
        category: 'Законодательства',
        path: '/uploads/library/adm.pdf'
    });
    Book.create({
        title: 'Гражданский кодекс',
        author: null,
        category: 'Законодательства',
        path: '/uploads/library/gc.pdf'
    });

    Person.create({
        login: 'admin',
        password: 'qwerty',
        name: 'Игорь',
        email:'brainsurgery@gmail.ru',
        surname: 'Налимов',
        telephone: '89248427178',
        birthday: '1990-01-26',
        country: 'Россия',
        area: 'Амурская',
        city: 'Благовещенск'
    });
    Person.create({
        login:'user',
        password: 'qwerty',
        name: 'Иван',
        email:'idiot@gmail.ru',
        surname:'Иванов',
        telephone: '89244563467',
        birthday: '1996-03-11',
        country: 'Россия',
        area: 'Амурская',
        city: 'Благовещенск'
    });
    Person.create({
        login:'user1',
        password: 'qwerty',
        name: 'Алексей',
        email:'moodle@gmail.ru',
        surname:'Смирнов',
        telephone: '89147363467',
        birthday: '1978-08-08',
        country: 'Россия',
        area: 'Амурская',
        city: 'Райчихинск'
    });
    Person.create({
        login:'user2',
        password: 'qwerty',
        name: 'Владимир',
        surname:'Петров',
        email:'admincool@mail.ru',
        telephone: '89244509866',
        birthday: '1988-12-01',
        country: 'Россия',
        area: 'Хабаровский',
        city: 'Хабаровск'
    });

    Question.create({
        title:'Помогите отсудить деньги за митинг',
        body:'Как это сделать?',
        author: 1,
        payable: false
    });
    Question.create({
        title:'Как составить договор дарственной на квартиру',
        body:'Как это сделать?',
        author: 2,
        payable: false
    });
    Question.create({
        title:'Как оформить доверенность на машину?',
        body:'Как это сделать?',
        author: 2,
        payable: false
    });
    Question.create({
        title:'Как откосить от армии?',
        body:'Как это сделать?',
        author: 3,
        payable: false
    });
    Question.create({
        title:'Помогите отсудить деньги за митинг',
        body:'Как это сделать?',
        author: 3,
        payable: false
    });
    Question.create({
        title:'Как развестить без согласия жены?',
        body:'Как это сделать?',
        author: 3,
        payable: false
    });
    Question.create({
        title:'Помогите отсудить деньги за митинг',
        body:'Как это сделать?',
        author: 4,
        payable: false
    });

    Answer.create({
        body:'Поступай как знаешь',
        to_question: 1,
        author: 2
    });

    Answer.create({
        body:'Я не знаю',
        to_question: 2,
        author: 1
    });
    Answer.create({
        body:'Ну, тут без литра не обойтись',
        to_question: 2,
        author: 3
    });

    Answer.create({
        body:'Я бы о таком не стал спрашивать)',
        to_question: 3,
        author: 1
    });
    Answer.create({
        body:'Не тут спрашивай!',
        to_question: 3,
        author: 2
    });
    Answer.create({
        body:'Никто не знает, и тебе не советую',
        to_question: 4,
        author: 1
    });

    Answer.create({
        body:'Где-то я про это читал...',
        to_question: 4,
        author: 2
    });

    Dialog.create({
        sender: 1,
        destination: 2
    });
    Dialog.create({
        sender: 1,
        destination: 3
    });
    Dialog.create({
        sender: 2,
        destination: 3
    });
    Message.create({
        body:'Здравствуйте! Я на счет вашего вопроса!',
        of_dialog: 1,
        sended_by: 1
    });
    Message.create({
        body:'Здравствуйте! Да, хорошо',
        of_dialog: 1,
        sended_by: 2
    });
    Message.create({
        body:'Тут необходимо оформить ряд документов',
        of_dialog: 1,
        sended_by: 1
    });
    Message.create({
        body:'Да? Каких именно?',
        of_dialog: 1,
        sended_by: 2
    });
    Message.create({
        body:'Здравствуйте!',
        of_dialog: 2,
        sended_by: 1
    });
    Message.create({
        body:'Здравствуйте!',
        of_dialog: 2,
        sended_by: 3
    });
    Message.create({
        body:'Здравствуйте!',
        of_dialog: 3,
        sended_by: 3
    })
});