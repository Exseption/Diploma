var mysql = require('mysql');


var connection = mysql.createConnection({
    host    :   'localhost',
    user    :   'root',
    password    :   '',
    database: 'law-portal'
});
// connection.selectAllUsers = function () {
    connection.connect();

    connection.query('SELECT * from users',
        function (error, result, fields) {
        if (error){
            throw error;
        }
            
        console.log(result);
    });
    connection.end(); 
// };
module.exports = connection;