/**
 * Search function used to query pool for items.
 *
 * 
 * @author Alexander Beers.
 */

const express = require('express'), router = express.Router()
const pool = require('../database/database')
const initCategories = require('../database/initCategories')

//Initialize categories of items from database.
var categories = initCategories.init()

//Search function that renders results to posts page
router.post('/results', function (req, res, next) {
    //deal with category result here later
    console.log("value returned from search entry is (" + req.body.searchEntry + ")")

    //if category was selected output all items for that category
    if (categories.includes(req.body.searchEntry)) {
        pool.query("SELECT * FROM item WHERE category=? AND approved = 1", [req.body.searchEntry], (err, result) => {
            if (err) {
                console.log(err)
            }
            res.render('results', {
                searchResult: result,
                categories: categories,
                isLogin: req.session.loggedin,
            })
        })
    }
    else if (!req.body.searchEntry) {

        pool.query("SELECT * FROM item WHERE approved = 1 ORDER BY date_upload DESC LIMIT 0, 8", (err, result) => {
            if (err) {
                console.log(err)
            } else {
                //console.log(result)
            }
            res.render('results', {
                searchResult: result,
                categories: categories,
                isLogin: req.session.loggedin,
                feedbackMessage: "Recent Posts on Gatortrader"
            })
        })
    } else {
        //else only output the item that the user entered
        pool.query("SELECT * FROM item WHERE name like '% AND approved = 1" + req.body.searchEntry + "%'", (err, result) => {
            if (err) {
                console.log(err)
            } else {
                //console.log(result)
            }
            res.render('results', {
                searchResult: result,
                categories: categories,
                isLogin: req.session.loggedin,
            })
        })
    }

})

module.exports = router