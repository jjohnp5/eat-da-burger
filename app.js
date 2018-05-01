let express = require('express');
let exphbs = require('express-handlebars');
let path = require('path');
let bodyParser = require('body-parser');
let mysql = require('mysql');

require('dotenv').config();

let app = express();
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));
connection.connect(err =>{
    if(err) throw err;
})
app.get('/', (req,res)=>{
    res.render('index');
});

app.get('/burgers', (req,res)=>{
    let burgers = [];
    
        connection.query(`SELECT * from burgers`, (err, response)=>{
            if(err) throw err;
            response.forEach(r=>{
                burgers.push(r);
            })
            console.log(burgers);
            res.json(burgers);            
        })

    
})
app.post('/add/burger', (req, res)=>{
    connection.query(`INSERT Into burgers(burger_name, devoured) values ('${req.body.burger}',0)`, (err, response)=>{
        if(err){
            res.send({response: false})
        }else{
            res.send({response: true})
        }
    })
})
app.post('/devour/:id', (req, res)=>{
    connection.query(`Update burgers set devoured = 1 where id = ${req.params.id}`, (err, r)=>{
        if(err){
            res.send({response: false});
        }else{
            res.send({response: true});
        }
    })
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log('Burger Devourer server started');
})