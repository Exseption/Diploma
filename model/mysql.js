var mysql = require('mysql');

var connection = mysql.createConnection({
    host    :   'localhost',
    user    :   'root',
    password    :   'qwerty',
    database: 'law-portal'
});
connection.selectUser = function (username) {
    connection.connect();

    connection.query('SELECT * from users WHERE username=?',[username], function (error, result, fields) {
        if (error){
            throw error;
        }
        console.log(result);
    });
    connection.end(); 
};
module.exports = connection;



connection.selectUser('igor');