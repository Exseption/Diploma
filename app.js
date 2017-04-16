const express = require('express'),
path = require('path'),
logger = require('morgan'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
session = require('express-session'),
routes = require('./routes/index'),
socket = require('./routes/socket'),
app = express();
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
app.get(api_version + '/library', routes.library);
app.get(api_version + '/questions', routes.questions);
app.get(api_version + '/ratings/answers', routes.ratingsAnswers);
app.get(api_version + '/ratings/people', routes.ratingsPeople);
app.get(api_version + '/question/:id', routes.questionById);
app.get(api_version + '/people', routes.people);
app.get(api_version + '/person/:id', routes.personById);
app.post(api_version + '/auth', routes.auth);
app.post(api_version + '/create/answer', routes.createAnswer);
app.post(api_version + '/vote/plus', routes.votePlus);
app.post(api_version + '/vote/minus', routes.voteMinus);
app.get(api_version + '/person/:id/dialogs', routes.personByIdDialogs);
app.get(api_version + '/person/:id/dialog/:dialog/messages', routes.personByIdDialogDialogIdMessages);
app.post(api_version + '/create/question', routes.createQuestion);
app.delete(api_version + '/delete/question/:id', routes.deleteQuestionById);
app.delete(api_version + '/delete/person/:id', routes.deletePersonById);
app.post(api_version + '/create/answer', routes.createAnswer);
app.post(api_version + '/create/person', routes.createPerson);
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

// заводим наш сервер
const debug = require('debug')('law-portal');
app.set('port', process.env.PORT || 3009);
const server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
    console.log('Сервер работает и доступен по адресу http://localhost:'+ app.get('port'));
});

// подключаем сокет
const io = require('socket.io').listen(server);
io.on('connection', function(socket){
    console.log('A user connected');
    socket.emit('news', { hello: 'Вы подключились!!!' });
    socket.on('disconnect', function () {
        io.emit('user:disconnected');
    });
});
