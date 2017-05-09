const express = require('express'),
path = require('path'),
logger = require('morgan'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
session = require('express-session'),
routes = require('./routes/index'),
app = express();
const methodOverride = require('method-override');
app.use(express.static(path.join(__dirname, 'client')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser({uploadDir: '/uploads'}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser());
app.use(session({
                  secret: '_secret$-#=key',
                  resave: true,
                  saveUninitialized: true,
                  cookie: { maxAge: 60000}
                }));
app.disable('x-powered-by');
const api_version = '/api/v1';

app.get(api_version + '/questions/author/:id', routes.myQuestions);
app.get(api_version + '/library', routes.library);

app.get(api_version + '/questions', routes.questions);
app.get(api_version + '/questions/all', routes.all_questions);

app.get(api_version + '/questions/digest', routes.digest_questions);
app.post(api_version + '/question/close', routes.closeQuestion);
app.post(api_version + '/question/open', routes.openQuestion);


app.get(api_version + '/ratings/answers', routes.ratingsAnswers);
app.get(api_version + '/ratings/people', routes.ratingsPeople);
app.get(api_version + '/question/:id', routes.questionById);
app.get(api_version + '/people', routes.people);
app.get(api_version + '/admin/people', routes.adm_people);

app.get(api_version + '/person/:id', routes.personById);

app.get(api_version + '/test', routes.test);
app.post(api_version + '/search', routes.search);

app.post(api_version + '/auth', routes.auth);
app.get(api_version + '/answers', routes.answers);
app.post(api_version + '/create/answer', routes.createAnswer);

app.post(api_version + '/vote/plus', routes.votePlus);
app.post(api_version + '/vote/minus', routes.voteMinus);

app.get(api_version + '/person/:id/dialogs', routes.personByIdDialogs);
app.get(api_version + '/person/:id/dialog/:dialog/messages', routes.personByIdDialogDialogIdMessages);
app.post(api_version + '/dialog/send_message', routes.send_message);
app.post(api_version + '/dialog/create', routes.createDialog);
app.post(api_version + '/dialog/rename', routes.renameDialog);

app.delete(api_version + '/dialog/delete/:dialogId', routes.deleteDialog); // delete!

app.post(api_version + '/create/question', routes.createQuestion);
app.delete(api_version + '/delete/question/:id', routes.deleteQuestionById);
app.delete(api_version + '/delete/person/:id', routes.deletePersonById);
// app.post(api_version + '/create/answer', routes.createAnswer);
app.post(api_version + '/create/person', routes.createPerson);

app.get(api_version + '/opts/:userId', routes.getOpts);
app.post(api_version + '/opts/save_changes', routes.save_opts_changes);
app.post(api_version + '/question/save_changes', routes.save_question_changes);
app.post(api_version + '/user/details', routes.save_user_details);

app.post(api_version + '/feedback', routes.feedback);
app.get(api_version + '/feedback/all', routes.getAll);
app.delete(api_version + '/feedback/delete/:id', routes.deleteFeedback);

app.get(api_version + '/archive', routes.archive);

app.get(api_version + '/news/digest', routes.news_digest);
app.get(api_version + '/news', routes.news);


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
const debug = require('debug')('law-portal');
app.set('port', process.env.PORT || 3009);
const server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
    console.log('Сервер работает и доступен по адресу http://localhost:'+ app.get('port'));
});
const io = require('socket.io').listen(server);
io.on('connection', function (socket) {
    console.log('Кто-то подключился к основному каналу!');

});
