const express = require('express'),
path = require('path'),
logger = require('morgan'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
session = require('express-session'),
app = express();
// const Sequelize = require('sequelize');
const methodOverride = require('method-override');
app.use(express.static(path.join(__dirname, 'client')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser());
app.use(session({
                  secret: '_secret$-#=key',
                  resave: false,
                  saveUninitialized: false
                }));
app.disable('x-powered-by');
const vapi = '/api/v1';

// const sequelize = new Sequelize('postgres://postgres:qwerty@localhost:5432/webservice');

// const Person = sequelize.define("person", {
//         login: {         type: Sequelize.STRING        },
//         password: {            type: Sequelize.STRING        },
//         name: {            type: Sequelize.STRING        },
//         surname: {            type: Sequelize.STRING        },
//         telephone: {            type: Sequelize.BIGINT        },
//         birthday: {            type: Sequelize.DATE        },
//         registrated: {            type: Sequelize.DATE,            defaultValue: Sequelize.NOW        },
//         rating: {            type: Sequelize.DOUBLE        },
//         active: {            type: Sequelize.BOOLEAN,            defaultValue: true        },
//         usergroup: {            type:Sequelize.ENUM('admin','user'),            defaultValue: 'user'        },
//         country: {            type: Sequelize.STRING        },
//         area: {            type: Sequelize.STRING        },
//         city: {            type: Sequelize.STRING        }
//     }
//     ,
//     {
//         classMethods: {
//             associate: function() {
//                 Person.hasMany(Question);
//             }
//         }
//     }
//
// );
//
// var Question = sequelize.define("question", {
//         title: {
//             type: Sequelize.STRING
//         },
//         body: {
//             type: Sequelize.STRING
//         },
//         // author: {
//         //     type: Sequelize.INTEGER,
//         //     references: {
//         //         model: Person,
//         //         key: 'id'
//         //     }
//         // },
//         created: {
//             type: Sequelize.DATE,
//             defaultValue: Sequelize.NOW
//         },
//         payable: {
//             type: Sequelize.BOOLEAN
//         },
//         price: Sequelize.DOUBLE,
//         closed: {
//             type: Sequelize.BOOLEAN,
//             defaultValue: false
//         }
//     }
//     ,
//         {
//             classMethods: {
//                 associate: function() {
//                     Question.belongsTo(Person);
//                 }
//             }
//         }
//
// );
// sequelize.sync().then(function () {
//
// });

// Person.hasMany(Question);
// Question.belongsTo(Person);

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

// const models = require('./models');
app.get(vapi + '/questions', function (req, res) { // получаем вопросы
    Question.findAll(
        {
            include: [
            {
                model: Person,
                    attributes: ['name', 'surname']
            }
        ]
    }).then(function (results) {
            res.json(results);
    })
});


app.get(vapi + '/question/:id', function (req, res) { // получаем вопрос по id
    Question.findAll({
        where: {
            id: req.params.id
        }}).then(function (result) {
        res.json(result)
    })
});

app.get(vapi + '/persons', function (req, res) { // получаем пользователей
    Person.findAll()
    .then(function (results) {
            res.json(results);
        })
});

app.get(vapi + '/person/:id', function (req, res) { // получаем пользователя по id
    Person.findAll({
        where: {
            id: req.params.id
        }}).then(function (result) {
        res.json(result)
    })
});
//чет подозрительна
app.get(vapi + '/question/:id/answers', function (req, res) { // получаем ответы к вопросу по id
    Answer.findAll({
        where:{
            to_question: req.params.id
        }
    })
        .then(function (result) {
            res.json(result);
        })
});
app.post(vapi + '/auth', function (req, res) { // авторизация пользователя
    Person.findAll({
        where: {
            login: req.body.login,
            password: req.body.pwd
        }
    }).then(function (result) {
        res.json(result);
    })
});
app.post(vapi + '/create/answer', function (req, res) { // создание ответа к вопросу
    Answer.create({
        body:req.body.body,
        author:req.body.author,
        to_question: req.body.question,
        mark: 0
    }).then(function (results) {
            res.send('OK');
        }, function (error) {
            console.log(error);
        })
    });
app.post(vapi + '/vote/plus', function (req, res) { //голосуем за ответ в плюс
    Answer.update({
        mark: sequelize.literal("mark + 0.1")
    },
        {
        where:{
            id: req.body.id
        }
    }).then(function (res) {
        res.send('OK');
    })
});
app.post(vapi + '/vote/minus', function (req, res) { //голосуем за ответ в минус
    Answer.update({
            mark: sequelize.literal("mark - 0.1")
        },
        {
            where:{
                id: req.body.id
            }
        }).then(function (res) {
        res.send('OK');
    })
});

app.get(vapi + '/person/:id/dialogs', function (req, res) {
    Dialog.findAll({
        where:{
            $or: {
                sender: req.params.id,
                destination: req.params.id
            }
        }
    }).then(function (results) {
        res.json(results);
    });
});


app.get(vapi + 'person/:id/dialog/:dialog/messages', function (req, res) {
    Message.findAll({
        where:null
    })

   // sequelize.query('select * from message as m, person as p where p.id = m.sended_by and m.dialog = $1 AND m.dialog in (select id from dialog where user1 = $2 OR user2 = $2)',
   //     {
   //         bind: [req.params.dialog, req.params.id],
   //         type: sequelize.QueryTypes.SELECT})
   //     .then(function (results) {
   //     res.send(results);
   // })
});
app.post(vapi + '/create/question', function (req, res) { //создаем вопрос
    // sequelize.query('INSERT INTO public.question(title, ' +
    //     'content, author, date_of_create, price, closed, payable)    ' +
    //     'VALUES ($1, $2, $3, now(), $4, false, $5)',
    //     {
    //         bind: [req.body.title, req.body.content, req.body.author, req.body.price, req.body.payable],
    //         type: sequelize.QueryTypes.INSERT
    //     })
    //     .then(function (result) {
    //         res.send(result)
    //     });
});

app.post(vapi + '/create/person', function (req, res) { // создаем нового пользователя
    // регистрация и из админки продумать
    // sequelize.query('INSERT INTO public.person(login, password, surname, name, patronym, birthday, date_of_registration, active, rating, usergroup, telephone, area, city, country, document) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',
    //     {bind: [
    //             req.body.login,
    //             req.body.password,
    //             req.body.surname,
    //             req.body.name,
    //             req.body.patronym,
    //             req.body.birthday,
    //             now(),
    //             true,
    //             null,
    //             'user',
    //             req.body.telephone,
    //             req.body.area,
    //             req.body.city,
    //             req.body.country,
    //             req.body.document
    //         ],
    //         type: sequelize.QueryTypes.INSERT
    //     })
    //     .then(function (result) {
    //         res.send(result)
    //     }).catch(function (error) {
    //     res.send('Opps, error!');
    // })
});



app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err);
  });
}
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});
module.exports = app;
