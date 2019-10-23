const express = require('express')
const app = express()
const path = require('path')
const mysql = require('mysql')
const bodyParser = require('body-parser')

//allows server of static files (such as css files) to work with nodejs
app.use(express.static(path.join(__dirname, '/public')));
//allows paring incoming request bodies in a middleware before handlers
app.use(bodyParser.urlencoded({ extended: true })); 
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs'); 

var db = mysql.createConnection({
    host: 'gatortrader.cdnacoov8a86.us-west-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: 'csc648_team10',
    //working database name, actual database is 'gatortrader'
    database: 'gatortrader_test' 
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

//routes
app.get("/", (req, res) => {
    //res.sendFile(path.join(__dirname, '/views', 'prototypeHome.html'))
    res.render('prototypeHome', { searchResult: ""})
})

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', '/about.html'))
})

app.get("/team/ibraheem", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/team', '/ibraheem.html'))
})

app.get("/team/tom", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/team', '/tom.html'))
})

app.get("/team/alexander", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/team', '/alexander.html'))
})

app.get("/team/lance", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/team', '/lance.html'))
})

app.get("/team/paul", (req, res) => {
   res.sendFile(path.join(__dirname, 'views/team', '/paul.html'))
})

app.get("/team/saleh", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/team', '/saleh.html'))
})


//used for test post that gets value from the protype homepage search bar
app.post('/grabValTest', function (req, res) { 
    var foo;

    console.log(req.body.searchEntry)
    if(!db._connectCalled) {
        db.connect();
    }

    //if user enters an empty search (therefore searchEntry is undefined) output all items
    if(!req.body.searchEntry) {
        db.query("SELECT * FROM item", (err, result) => {
            if(err) {
                console.log(err)
            } else {
                console.log(result)
            }
            res.render('prototypeHome', {
                searchResult: result
            })
        })  
    } else {
        //else only output the item that the user entered
        db.query("SELECT * FROM item WHERE name=?", [req.body.searchEntry], (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log(result)
            }
            res.render('prototypeHome', {
                searchResult: result
            })
        })
    }
})

const PORT = 3000
app.listen(PORT, () => console.log('Server running on port ' + PORT))