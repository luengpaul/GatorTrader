const express = require('express'), router = express.Router()
const db = require('../database')

try {
    var dbConnection = db.connection()
} catch (err) {
    console.log(err)
}

var categories = db.initCategories()


//Search function that renders results to posts page
router.post('/results', function (req, res,next) {
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
                isLogin:req.session.loggedin,
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
                isLogin:req.session.loggedin,
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
                isLogin:req.session.loggedin,
            })
        })
    }
    
})

module.exports = router;
