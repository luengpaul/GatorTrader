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


//This variable temporarily init to true is passed to pages so navbar can be dynamically updated
var isLogin=false
exports.isLogin=isLogin


//configures ejs as templating language
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//add middleware layers required for application (static file serving, etc)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', routes)
app.use('/', aboutRoutes)

var categories = db.initCategories()

//Search function that renders results to posts page
app.post('/results', function (req, res) {
    //deal with category result here later
    console.log("value returned from search entry is (" + req.body.searchEntry + ")")

    //if category was selected output all items for that category
    if(categories.includes(req.body.searchEntry)) {
            dbConnection.query("SELECT * FROM item WHERE category=?", [req.body.searchEntry], (err, result) => {
            if (err) {
                console.log(err)
            }
            res.render('results', {
                searchResult: result,
                categories: categories,
                isLogin:isLogin,
                resultSize: result.length
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
            res.render('results', {
                searchResult: result,
                categories: categories,
                isLogin:isLogin,
                resultSize: result.length
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
            res.render('results', {
                searchResult: result,
                categories: categories,
                isLogin:isLogin,
                resultSize: result.length
            })
        })
    }
})

const PORT = 3000

app.listen(PORT, () => console.log('Server running on port ' + PORT))
