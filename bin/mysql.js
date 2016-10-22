var mysql = require('mysql');
var math = require('./ex.js');

var connection = mysql.createConnection({
    host    :   'localhost',
    user    :   'root',
    password    :   '',
    database: 'law-portal'
});

connection.getConnect = function () {
    connection.connect();

    connection.query('SELECT * from users',
        function (error, rows, fields) {
        if (error)
            throw error;
        for(var i =0; i < rows.length; i++){
            console.log(rows[i]);
        }
    });
    connection.end(); 
}



connection.delayed = function () {
    setTimeout(function () {
            var sum = math.sum(3,7)
        }
        ,5000);
}

module.exports = connection;
