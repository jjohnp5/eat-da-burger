let mysql = require('mysql');

let connection;
if(process.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}else{
    connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: process.env.DB_PASSWORD,
    database: "burgers_db"
  });
}

connection.connect(err =>{
    if(err) throw err;
    console.log('Connected as id ' + connection.threadId);
})

module.exports = connection;