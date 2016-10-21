var express = require('express');
var router = express.Router();

router.get('/seminars', function(req, res, next) {
  res.render('seminars', {title: 'Семинары'});
});

module.exports = router;
