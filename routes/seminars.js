var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('seminars', {title: 'Семинары', portalTitle: 'Название'});
});

module.exports = router;
