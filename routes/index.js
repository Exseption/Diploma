var express = require('express'),
    router = express.Router();
    
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Главная', longTitle: 'Очень длинный заголовок' });
});

module.exports = router;
