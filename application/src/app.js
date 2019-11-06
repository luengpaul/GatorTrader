const express = require('express'), app = express()
const path = require('path')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')
const aboutRoutes = require('./routes/aboutPgRoutes')
const db = require('./database')
try {
    var dbConnection = db.connection()
} catch (err) {
    console.log(err)
}


//configures ejs as templating language
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//add middleware layers required for application (static file serving, etc)
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', routes)
app.use('/', aboutRoutes)

var types = db.initCategories()

//used for test post that gets value from the protype homepage search bar
app.post('/', function (req, res) {
    //deal with category result here later
    console.log("value returned from search entry is (" + req.body.searchEntry + ")")

    //if category was selected output all items for that category
    if(types.includes(req.body.searchEntry)) {
            dbConnection.query("SELECT * FROM item WHERE category=?", [req.body.searchEntry], (err, result) => {
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
        dbConnection.query("SELECT * FROM item", (err, result) => {
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
        dbConnection.query("SELECT * FROM item WHERE name like '%" + req.body.searchEntry+ "%'", (err, result) => {
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

app.listen(PORT, () => console.log('Server running on port ' + PORT))

