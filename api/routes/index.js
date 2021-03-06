const Sequelize = require('sequelize');
const config = require('../db/config/config.json');
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const Person = sequelize.import('../db/models/person');
const Question = sequelize.import('../db/models/question');
const Answer = sequelize.import('../db/models/answer');
const Dialog = sequelize.import('../db/models/dialog');
const Message = sequelize.import('../db/models/message');
const Book = sequelize.import('../db/models/book');
const Option = sequelize.import(('../db/models/option'));
const New = sequelize.import(('../db/models/new'));
const Attachment = sequelize.import('../db/models/attachment');
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
Person.hasMany(Option, {foreignKey: 'of_user', as: 'settings'});
Option.belongsTo(Person, {foreignKey: 'of_user', as: 'settings'});
New.belongsTo(Person,{foreignKey: 'author'});
Person.hasMany(New,{foreignKey: 'author'});
const Feedback = sequelize.import('../db/models/feedback');
const Help = sequelize.import('../db/models/help');
var CryptoJS = require("crypto-js");
exports.getOpts = function (req, res) {
  Option.findOne({
      where: {
          of_user: req.params.userId
      }
  }).then(function (opts) {
      res.send(opts)
  })
};
exports.feedback = function (req, res) {
  Feedback.create({
      name: req.body.name,
      body: req.body.message
  }).then(function (success) {
      res.send(success);
  }, function (error) {
      console.log(error);
      res.status(400).end('ERROR');
  })
};
exports.getAll = function (req, res) {
    Feedback.findAll({}).then(function (feedback) {
        res.send(feedback);
    })
};
exports.deleteFeedback = function (req, res) {
    Feedback.destroy({
        where: {
            id: req.params.id
        },
    }).then(function () {
        res.status(200).end('OK');
    })
};
exports.save_user_details = function (req, res) {
    Person.update({
        name: req.body.name,
        surname: req.body.surname,
        telephone: req.body.telephone,
        email: req.body.email,
        country: req.body.country,
        area: req.body.area,
        city: req.body.city
    },{
        where: {
            id: req.body.id
        }
    }).then(function (success) {
        res.send(success);
    }, function (error) {
        res.send(error);
    })
};
exports.save_opts_changes = function (req, res) {
  Option.update({
      show_telephone: req.body.telephone,
      show_email: req.body.email
  },{
      where: {
      of_user: req.body.userId
  }}
  ).then(function (success) {
      res.send(success);
  })
};
exports.save_question_changes = function (req, res) {
    if(req.body.payable === false){
        req.body.money = 0;
    }
    Question.update({
        title: req.body.title,
        body: req.body.body,
        closed: req.body.closed,
        payable: req.body.payable,
        price: req.body.money
    },{
        where: {
            id: req.body.id
        }
    }).then(function (success) {
        res.send(success);
    }, function (error) {
        res.send(error);
    })
};
exports.library = function (req, res) { // получаем библиотеку
    Book.findAll(
        {
        }).then(function (results) {
        res.json(results);
    })
};
exports.myQuestions = function (req, res) {
    Question.findAll({
        where: {
            author: req.params.id
        },
        include: [{
            model: Answer,
            include: {
                model: Person,
                attributes: ['id', 'name', 'surname']
            }
        }]
    }).then(function (results) {
        res.send(results);
    })
};
exports.questions = function (req, res) { // получаем вопросы (незакрытые)
    Question.findAll(
        {
            where:{
                closed: false
            },
            order: [['created', 'DESC']],
            include: [{
                model: Answer
            },
                {
                    model: Person,
                    attributes: ['id', 'name', 'surname']
                }
            ]
        }).then(function (results) {
        res.json(results);
    })
};
exports.all_questions = function (req, res) { // получаем вопросы
    Question.findAll(
        {
            order: [['created', 'DESC']],
            include: [{
                model: Answer
            },
                {
                    model: Person,
                    attributes: ['id', 'name', 'surname']
                }
            ]
        }).then(function (results) {
        res.json(results);
    })
};
exports.digest_questions = function (req, res) { // получаем вопросы
    Question.findAll(
        {
            limit: 10,
            where:{
                closed: false
            },
            order: [['created', 'DESC']],
            include: [{
                model: Answer
            },
                {
                    model: Person,
                    attributes: ['id', 'name', 'surname']
                }
            ]
        }).then(function (results) {
        res.json(results);
    })
};
exports.closeQuestion = function (req, res) {
    Question.update({
        closed: true
    },{
        where: {
            id: req.body.id
        }
    }).then(function (results) {
        res.send(results);
    })
};
exports.openQuestion = function (req, res) {
    Question.update({
        closed: false
    },{
        where: {
            id: req.body.id
        }
    }).then(function (results) {
        res.send(results);
    })
};
exports.ratingsAnswers = function (req, res) { // получаем рейтинги ответов по убыванию
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
};
exports.ratingsPeople = function (req, res) { // получаем рейтинги пользователей по убыванию
    Person.findAll(
        {
            order: [['rating', 'DESC']],
            attributes:['id', 'name', 'surname', 'rating', 'birthday'],
            include: [
                {
                    model: Answer,
                    attributes: []
                    }]
        }).then(function (results) {
        res.json(results);
    })
};
exports.questionById = function (req, res) { // получаем вопрос по id с ответами
    Question.findOne({
        where: {
            id: req.params.id
        },
        include:[{
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
};
exports.people = function (req, res) { // получаем пользователей c вопросами и ответами
    Person.findAll({
        attributes:{ exclude: ['login', 'password']},
        include:[{
            model:Question
        },{
            model:Answer
        }]

    })
        .then(function (results) {
            res.send(results);
        })
};
exports.adm_people = function (req, res) { // получаем пользователей c вопросами и ответами
    Person.findAll({
        include:[{
            model:Question
        },{
            model:Answer
        }]
    })
        .then(function (results) {
            res.send(results);
        })
};
exports.search = function (req, res) {
    Question.findAll({
        where: {
            $or: [{ body: {
                $like: '%' + req.body.body + '%'
            }}, { title:{$like: '%' + req.body.body + '%'}}]
        }
    }).then(function (result) {
        res.send(result);
    })
};
exports.personById = function (req, res) { // получаем пользователя по id
    Person.findOne({
        where: {
            id: req.params.id
        },
        attributes:{ exclude: ['login', 'password']},
        include:[{
            model: Question
        },
            {
                model: Answer
            },
            {
            model: Option,
                as:'settings'
            }
            ]
    }).then(function (result) {
        res.json(result)
    })
};
exports.auth =function (req, res) { // авторизация пользователя
    Person.findAll({
        where: {
            login: req.body.login,
            password: req.body.pwd
        }
    }).then(function (result) {
        res.json(result);
    })
};
exports.answers = function (req, res) {
    Answer.findAll({
      include: {
          model: Person,
          attributes: {exclude: ['login', 'password']}
      }
    }).then(function (results) {
        res.send(results);
    })
};
exports.createAnswer = function (req, res) { // создание ответа к вопросу
    Answer.create({
        body:req.body.body,
        author:req.body.author,
        to_question: req.body.toquestion,
        mark: 0
    }).then(function (results) {
        res.send('OK');
    }, function (error) {
        console.log(error);
    })
};
exports.votePlus = function (req, res) { //голосуем за ответ в плюс
    Answer.update({
            mark: sequelize.literal("mark + 0.1")
        },
        {
            where:{
                id: req.body.id
            }
        }
    ).then(function (result) {
        res.send(result);
    });
    console.log('Need to update rating of user, huh')
    //TODO select sum of user's marks and result set to rating
};
exports.voteMinus = function (req, res) { //голосуем за ответ в минус
    Answer.update({
            mark: Sequelize.literal("mark - 0.1")
        },
        {
            where:{
                id: req.body.id
            }
        }).then(function (result) {
        res.send(result);
    })
};
exports.personByIdDialogs =function (req, res) {
    Dialog.findAll({
        where:{
            $or: {
                sender: req.params.id,
                destination: req.params.id
            }
        }
    }).then(function (results) {
        res.send(results);
    });
};
exports.news_digest = function (req, res) {
 New.findAll({
     limit: 5
 }).then(function (results) {
     res.send(results);
 })
};
exports.news = function (req, res) {
  New.findAll({
      order: [['created', 'DESC']]
  }).then(function (results) {
      res.send(results);
  })
};
exports.createNew = function (req, res) {
    New.create({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author
    }).then(function (results) {
        res.send(results);
    })
};
exports.updateNew = function (req, res) {
  New.update({
      body: req.body.body,
      title: req.body.title,

  }, {
      where: {
          id: req.body.id
      }
  }).then(function (results) {
      res.send(results);
  })
};
exports.deleteNew = function (req, res) {
    New.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (results) {
        res.status(200).end('OK');
    })
};

exports.help = function (req, res) {
    Help.findAll({}).then(function (data) {
        res.send(data);
    })
};
exports.createHelp = function (req, res) {
    Help.create({
        section: req.body.section,
        title: req.body.title,
        content: req.body.content
    }).then(function (results) {
        res.send(results);
    })
};
exports.editHelp = function (req, res) {
    Help.update({
        section: req.body.section,
        title: req.body.title,
        content: req.body.content
    },
        {
        where: {
        id: req.body.id
            }
        }
    )
};
exports.archive = function (req, res) {
    Question.findAll({
        where: {
            closed: true
        }, include: [{
            model: Answer
        },{
            model: Person,
            attributes: {exclude: ['login', 'password']}
        }]
    }).then(function (results) {
        res.send(results);
    })
};
exports.personByIdDialogDialogIdMessages = function (req, res) {
    Dialog.findOne({
        where:{ $and: {
            $or: {
                sender: req.params.id,
                destination: req.params.id
            },
            id: req.params.dialog
        }},
        include: [{
            model: Message,
            include: {
                model: Person,
                attributes: ['name', 'surname', 'id']
            }
        }]
    }).then(function (results) {
        res.json(results);
    });
};
exports.send_message = function (req, res) {
    Message.create({
        body: req.body.body,
        of_dialog: req.body.of_dialog,
        sended_by: req.body.sended_by
    }).then(function (success) {
        res.send(success);
    },function (error) {
        console.log(error);
    })
};
exports.createDialog = function (req, res) {
    Dialog.create({
        caption: req.body.caption,
        sender: req.body.sender,
        destination: req.body.destination
    }).then(function (success) {
        res.send(success);
    }, function (error) {
        res.send(error); //make error handling on frontend
    })
};
exports.renameDialog = function (req, res) {
  Dialog.update({
    caption: req.body.caption
  },
      {
      where: {
          id: req.body.id
      }
  }).then(function (success) {
      res.send(success);
  })
};
exports.deleteDialog = function (req, res) {
    Dialog.destroy({
        where: {
            id: req.params.dialogId
        }
    }).then(function (rowDeleted) {
        res.status(200).end('OK')
    }, function (err) {
        res.send(err);
        console.log(err);
    })
};
exports.createQuestion = function (req, res) { //создаем вопрос
    Question.create({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        price:req.body.price,
        payable: req.body.payable
    }).then(function (result) {
        res.send(result)
    });
};
exports.deleteQuestionById = function (req, res) {
    Question.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (result) {
        res.json(result);
    })
};
exports.deletePersonById = function (req, res) {
    Person.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (result) {
        res.json(result);
    })
};
exports.createAnswer = function (req, res) { //создаем ответ
    Answer.create({
        body: req.body.body,
        author: req.body.author,
        toQuestion: req.body.to_question,
        mark: 0.0
    }).then(function (result) {
        res.send(result)
    });
};
exports.createPerson = function (req, res) { // создаем нового пользователя
    Person.create({
        login:req.body.login,
        password: req.body.password,
        name:req.body.name,
        surname:req.body.surname,
        email: req.body.email,
        telephone:req.body.telephone,
        birthday:req.body.birthday,
        country:req.body.country,
        area:req.body.area,
        city:req.body.city,
        rating: 0.0
    }).then(function (result) {
        res.send(result)
    })
};