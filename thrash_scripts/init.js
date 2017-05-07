const Sequelize = require('sequelize');
const config = require('../api/db/config/config.json');
const sequelize = new Sequelize(config.database, config.username, config.password, config);



const Person = sequelize.import('./models/person');
const Question = sequelize.import('./models/question');
const Answer = sequelize.import('./models/answer');
const Dialog = sequelize.import('./models/dialog');
const Message = sequelize.import('./models/message');
const Book = sequelize.import('./models/book');
const Attachment = sequelize.import('./models/attachment');
const Option = sequelize.import('./models/option');

const Feedback = sequelize.import('./models/feedback'); // для обратной связи

Question.belongsTo(Person, {foreignKey: 'author'});
Person.hasMany(Question, {foreignKey: 'author'}); //чет падазрительна
Answer.belongsTo(Question, {foreignKey: 'to_question'});
Question.hasMany(Answer, {foreignKey: 'to_question'});
Answer.belongsTo(Person, {foreignKey: 'author'});
Person.hasMany(Answer, {foreignKey: 'author'});
Message.belongsTo(Dialog, {foreignKey: 'of_dialog'});
Dialog.hasMany(Message, {foreignKey: 'of_dialog'});
Message.belongsTo(Person, {foreignKey: 'sended_by'});
Person.hasMany(Message, {foreignKey: 'sended_by'});
Dialog.belongsTo(Person,{foreignKey: 'sender'});
Person.hasMany(Dialog,{foreignKey: 'sender'});
Dialog.belongsTo(Person,{foreignKey: 'destination'});
Person.hasMany(Dialog,{foreignKey: 'destination'});
Attachment.belongsTo(Message, {foreignKey: 'to_message'});
Message.hasMany(Attachment, {foreignKey: 'to_message'});


// need to remember
Person.hasMany(Option, {foreignKey: 'of_user'});
Option.belongsTo(Person, {foreignKey: 'of_user'});
// sequelize.sync({force: true});


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
        surname: 'Иванов',
        telephone: '89248427178',
        birthday: '1990-01-26',
        country: 'Россия',
        area: 'Амурская',
        city: 'Благовещенск',
        usergroup: 'admin'
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
        title:'Nulla non dolor pharetra, egestas metus vel, consectetur sem',
        body:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque auctor sed est vel vestibulum. ' +
        'Duis placerat eros id leo consectetur eleifend. Sed condimentum' +
        ' vitae elit sit amet blandit. Aliquam viverra fermentum maximus. In est diam, porta nec gravida',
        author: 1,
        payable: false
    });
    Question.create({
        title:'Morbi at lectus tincidunt, posuere lacus a, finibus libero',
        body:'Pellentesque gravida, felis et interdum elementum, tellus enim efficitur nulla, ' +
        'at imperdiet nisl turpis nec nisl. Nam risus velit, luctus sed malesuada at, aliquam in nunc. ' +
        'Vivamus sapien diam, convallis ac ante id, auctor consequat lorem. Donec non nisi',
        author: 2,
        payable: false
    });
    Question.create({
        title:'Suspendisse egestas ligula elit, id facilisis sapien semper ac',
        body:'Nam ac diam lobortis, vestibulum nulla sit amet, aliquet massa. ' +
        'Maecenas venenatis rhoncus blandit. Nulla in felis risus. Phasellus risus neque, vestibulum ut ' +
        'turpis a, pellentesque auctor nisl. Sed volutpat urna enim, venenatis tempor diam commodo rhoncu',
        author: 2,
        payable: false
    });
    Question.create({
        title:'Aliquam in tellus eu urna efficitur feugiat',
        body:'Sed mollis condimentum ante, et posuere purus fringilla vestibulum. Nulla euismod convallis euismod. Phasellus vel libero lacinia, faucibus eros in, blandit arcu. Fusce efficitur a felis sed auctor. Integer tempor est ipsum, vitae euismod nibh dapibus nec',
        author: 3,
        payable: false
    });
    Question.create({
        title:'Sed volutpat urna enim, venenatis tempor diam commodo rhoncus',
        body:'Praesent ac convallis ligula. Curabitur sit amet nisl dapibus, laoreet diam ut, consectetur ex. Maecenas volutpat maximus nibh in dignissim. Integer sagittis lacus quis commodo egestas. Donec turpis neque, ultrices et dolor vitae, lacinia varius felis. Nu',
        author: 3,
        payable: false
    });
    Question.create({
        title:'Cras vestibulum leo vulputate molestie sagittis',
        body:'Nullam at lorem ut sem maximus consequat et non eros. Pellentesque nec ultricies magna, nec ullamcorper orci. Pellentesque mollis, justo vitae eleifend posuere, mauris dolor bibendum erat, eu cursus massa magna vitae urna. Fusce blandit laoreet volutpat.',
        author: 3,
        payable: false
    });
    Question.create({
        title:'Aliquam viverra fermentum maximus',
        body:'Integer luctus gravida venenatis. Vivamus in congue erat. Aenean purus nunc, hendrerit aliquam nulla vel, imperdiet feugiat neque. Quisque lorem metus, porttitor et lectus id, placerat fringilla sem. Integer consequat vestibulum nulla, sed consectetur ant',
        author: 4,
        payable: false
    });

    Answer.create({
        body:'Vestibulum convallis nec sem eu molestie. Vivamus non mi sit amet mi egestas ultricies eget in mauris. Nullam molestie efficitur dignissim.',
        to_question: 1,
        author: 2,
        mark: 0.0
    });

    Answer.create({
        body:'Ut placerat finibus mi, nec sollicitudin dolor elementum et. Fusce vel tincidunt nulla. Nulla neque est, scelerisque fringilla erat eget, malesuada facilisis metus.',
        to_question: 2,
        author: 1,
        mark: 0.0
    });
    Answer.create({
        body:'Vestibulum molestie mauris sagittis, euismod justo nec, pretium eros. Suspendisse molestie odio id venenatis maximus.',
        to_question: 2,
        author: 3,
        mark: 0.0
    });

    Answer.create({
        body:'Maecenas volutpat maximus nibh in dignissim. Integer sagittis lacus quis commodo egestas. Donec turpis neque, ultrices et dolor vitae, lacinia varius felis. Nullam justo sapien, porttitor vitae tempus id, ullamcorper at diam',
        to_question: 3,
        author: 1,
        mark: 0.0
    });
    Answer.create({
        body:'Nullam vitae ultricies sapien. Aliquam et interdum purus',
        to_question: 3,
        author: 2,
        mark: 0.0
    });
    Answer.create({
        body:'Sed nec odio in urna vulputate aliquet. Vestibulum venenatis non arcu nec faucibus',
        to_question: 4,
        author: 1,
        mark: 0.0
    });

    Answer.create({
        body:'Morbi at lectus tincidunt, posuere lacus a, finibus libero. Phasellus rutrum ullamcorper urna consectetur semper',
        to_question: 4,
        author: 2,
        mark: 0.0
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
    });
    Option.create({
        show_email: true,
        show_telephone: true,
        of_user: 1
    });
    Option.create({
        show_email: false,
        show_telephone: true,
        of_user: 2
    });
    Option.create({
        show_email: true,
        show_telephone: false,
        of_user: 3
    });
});