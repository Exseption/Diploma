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
const api_version = '/api/v1';
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
Person.hasMany(Question, {foreignKey: 'author'}); //чет падазрительна

Answer.belongsTo(Question, {foreignKey: 'to_question'});
Question.hasMany(Answer, {foreignKey: 'to_question'});

Answer.belongsTo(Person, {foreignKey: 'author'});
Person.hasMany(Answer, {foreignKey: 'author'});

Message.belongsTo(Dialog, {foreignKey: 'of_dialog'});
Dialog.hasMany(Message, {foreignKey: 'of_dialog'});

// Dialog.hasMany(Message);
Message.belongsTo(Person, {foreignKey: 'sended_by'});
Person.hasMany(Message, {foreignKey: 'sended_by'});

Dialog.belongsTo(Person,{foreignKey: 'sender'});
Person.hasMany(Dialog,{foreignKey: 'sender'});

Dialog.belongsTo(Person,{foreignKey: 'destination'});
Person.hasMany(Dialog,{foreignKey: 'destination'});


Attachment.belongsTo(Message, {foreignKey: 'to_message'});
Message.hasMany(Attachment, {foreignKey: 'to_message'});


app.get(api_version + '/library', function (req, res) { // получаем вопросы
    Book.findAll(
        {
        }).then(function (results) {
        res.json(results);
    })
});

app.get(api_version + '/questions', function (req, res) { // получаем вопросы
    Question.findAll(
        {order: [['created', 'DESC']],
            include: [
            {
                model: Person,
                    attributes: ['id', 'name', 'surname']
            }
        ]
    }).then(function (results) {
            res.json(results);
    })
});

app.get(api_version + '/ratings/answers', function (req, res) { // получаем рейтинги ответов по убыванию
    Answer.findAll(
        {
            order: [['mark', 'DESC']],
            include: [{
              model: Question,
                attributes: ['id','title']
            },
                {
                    model: Person,
                    attributes: ['id', 'name', 'surname']
                }
            ]
        }).then(function (results) {
        res.json(results);
    })
});

app.get(api_version + '/ratings/people', function (req, res) { // получаем рейтинги пользователей по убыванию
    Person.findAll(
        {
            order: [['rating', 'DESC']],
            attributes:['id', 'name', 'surname', 'rating'],
            include: [{
                model: Question,
                attributes: ['id','title']
            },
                {
                    model: Answer,
                    include: {
                        model: Question,
                        attributes: ['id','title']
                    }}]
        }).then(function (results) {
        res.json(results);
    })
});


app.get(api_version + '/question/:id', function (req, res) { // получаем вопрос по id с ответами
    Question.findOne({
        where: {
            id: req.params.id
        },include:[{
            model: Person,
            attributes: ['id', 'name', 'surname']
        },
            {
                model: Answer,
                include: {
                    model:Person,
                    attributes:['id', 'name','surname']
                }
            }]}).then(function (result) {
        res.json(result)
    })
});

app.get(api_version + '/people', function (req, res) { // получаем пользователей c вопросами и ответами
    Person.findAll({
        include:[{
            model:Question
        },{
            model:Answer
        }]

    })
    .then(function (results) {
            res.json(results);
        })
});

app.get(api_version + '/person/:id', function (req, res) { // получаем пользователя по id
    Person.findAll({
        // attributes: ['name', 'surname'],
        where: {
            id: req.params.id
        },
        include:[{
            model: Question
        },
            {
                model: Answer
            }]
    }).then(function (result) {
        res.json(result)
    })
});

//чет подозрительна подумать чтобы сразу с вопросом запрашивать ответы
// app.get(api_version + '/question/:id/answers', function (req, res) { // получаем ответы к вопросу по id
//     Answer.findAll({
//         where:{
//             to_question: req.params.id
//         }
//     })
//         .then(function (result) {
//             res.json(result);
//         })
// });
app.post(api_version + '/auth', function (req, res) { // авторизация пользователя
    Person.findAll({
        where: {
            login: req.body.login,
            password: req.body.pwd
        }
    }).then(function (result) {
        res.json(result);
    })
});
app.post(api_version + '/create/answer', function (req, res) { // создание ответа к вопросу
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
app.post(api_version + '/vote/plus', function (req, res) { //голосуем за ответ в плюс
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
app.post(api_version + '/vote/minus', function (req, res) { //голосуем за ответ в минус
    Answer.update({
            mark: Sequelize.literal("mark - 0.1")
        },
        {
            where:{
                id: req.body.id
            }
        }).then(function (res) {
        res.send('OK');
    })
});

app.get(api_version + '/person/:id/dialogs', function (req, res) {
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

app.get(api_version + '/person/:id/dialog/:dialog/messages', function (req, res) {
    Dialog.findAll({
        where:{ $and: {
            $or: {
                sender: req.params.id,
                destination: req.params.id
            },
            id: req.params.dialog
        }},
        include: [{
                model: Message
        }]
    }).then(function (results) {
        res.json(results);
    });
});

app.get(api_version + 'person/:id/dialogs/:dialog/messages', function (req, res) {
    Message.findAll({
        include:[{
            model: Person
        }]
    }).then(function (results) {
       res.send(results);
   })
});
app.post(api_version + '/create/question', function (req, res) { //создаем вопрос
    Question.create({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        price:req.body.price,
        payable: req.body.payable
    }).then(function (result) {
            res.send(result)
        });
});

app.post(api_version + '/create/person', function (req, res) { // создаем нового пользователя
    Person.create({
        login:req.body.login,
        password:req.body.password,
        name:req.body.name,
        surname:req.body.surname,
        telephone:req.body.telephone,
        birthday:req.body.birthday,
        country:req.body.country,
        area:req.body.area,
        city:req.body.city
    }).then(function (result) {
            res.send(result)
})
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
