var express = require('express'),
    router = express.Router();
    
router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'Главная',
      longTitle: 'Очень длинный заголовок',
      portalTitle: 'Название',
      questionTitle: 'Название вопроса',
      questionBody: 'Очень много текста',
      numberOfAnswers: '4'
  });
});

module.exports = router;
