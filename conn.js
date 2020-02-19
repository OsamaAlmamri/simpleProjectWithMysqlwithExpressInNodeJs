const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'codingacadimy'
});
connection.connect((err) => {
    // if (err) throw err;
    console.log('DB Connected!');
});
module.exports= connection;