let express = require('express');
let expbs = require('express-handlebars');
let path = require('path');
let bodyParser = require('body-parser');
let mysql = require('mysql');

require('dotenv').config();

let app = express();

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "top_songsDB"
  });
  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));



app.listen(process.env.PORT || 3000, ()=>{
    console.log('Burger Devourer server started');
})