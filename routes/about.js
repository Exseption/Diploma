var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('about', {
        title: 'О нас'
        , portalTitle: 'Название'
        , aboutBody: 'Очень много текста' });
});

module.exports = router;
