var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Главная', longTitle: 'Очень длинный заголовок' });
});

module.exports = router;
