/**
 * This module contains all the routes for the application
 *
 * Handles the routing and rendering of webpages.
 *
 * @author 
 */

const express = require('express'), router = express.Router()
const initCategories = require('../database/initCategories')
const pool = require('../database/database')

//Initializes categories of items for database
var categories = initCategories.init()


//Route for posting form page
router.post("/user/messages", (req, res) => {
    pool.query("SELECT * FROM messages WHERE ", [], (err, results) => {
        if (err) {
            console.log(err)
        }
        res.render('results', {
            searchResult: results,
            categories: categories,
            isLogin: req.session.loggedin,
        })
    })
})



router.post("/user/sales", (req, res) => {
    
    console.log("This is the userID " + req.session.userID)

    pool.query("SELECT * FROM item WHERE userID=? ", [req.session.userID], (err, results) => {
        if (err) {
            console.log(err)
        }

        console.log(results)

        if (req.session.loggedin) {
            res.render('userDashboardSalesItemTab', {
                salesItems: results,
                categories: categories,
                isLogin: req.session.loggedin
            })
        }
        else {
            req.flash('error_msg','You dont have access to this website')
            //res.send('You dont have access to this website');
        }
        res.end();
})
})


function getUserID(email) {
        pool.query("SELECT userID FROM User WHERE email = ?", [email], (err, rows, result) => {
            var userID = 0
            if (rows[0]) {
                var userID = rows[0].userID
                resolve(userID)
            }
        })
}

module.exports = router