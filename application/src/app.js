const express = require('express'), app = express()
const path = require('path')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')
const aboutRoutes = require('./routes/aboutPgRoutes')

//configures ejs as templating language
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//add middleware layers required for application (static file serving, etc)
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/views')));
app.use('/', routes)
app.use('/', aboutRoutes)

//create connection to application database con
var db = mysql.createConnection({
    host: 'gatortrader.cdnacoov8a86.us-west-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: 'csc648_team10',
    //working database name, actual database is 'gatortrader'
    database: 'gatortrader_test' 
})
db.connect(function (err) {
    if (err) throw err
    console.log("Connected!")
})

//get categories fetched from db in routes.js
var types = []

db.query("SELECT * FROM category", (err, result) => {
    if (err) {
        console.log(err)
    } else {
        if (types.length == 0) {
            for (let i = 0; i < result.length; i++) {
                types.push(result[i].type)
            }
        }
    }
})

//gets value from the protype homepage search bar or category pulldown and searches for appropriate items in database
app.post('/', function (req, res) { 
    if(!db._connectCalled) {
        db.connect()
    }
  
    //deal with category result here later
    console.log("value returned from search entry is (" + req.body.searchEntry + ")")

    //if category was selected output all items for that category
    if(types.includes(req.body.searchEntry)) {
            db.query("SELECT * FROM item WHERE category=?", [req.body.searchEntry], (err, result) => {
            if (err) {
                console.log(err)
            } 

            res.render('home', {
                searchResult: result,
                categories: types
            })
        })
    } 
    else if (!req.body.searchEntry) {
        db.query("SELECT * FROM item", (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log(result)
            }
            res.render('home', {
                searchResult: result,
                categories: types
            })
        })
    } else {
        //else only output the item that the user entered
        db.query("SELECT * FROM item WHERE name like '%" + req.body.searchEntry+ "%'", (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log(result)
            }
            res.render('home', {
                searchResult: result,
                categories: types
            })
        })
    }
})

const PORT = 3000
app.listen(PORT, (req, res) => {
    console.log('Server running on port ' + PORT)
})