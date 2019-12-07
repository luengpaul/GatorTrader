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


//Route for user dashboard messages tab
router.get("/user/messages", (req, res) => {
    pool.query("SELECT * FROM message WHERE recieverID=? ", [req.session.userID], (err, results) => {
        if (err) {
            console.log(err)
        }
        // console.log(results)

        if (req.session.loggedin) {
            res.render('userDashboardMessageTab', {
                messages: results,
                categories: categories,
                isLogin: req.session.loggedin
            })
        }
    })
})



//Route for user dashboard posted items tab
router.get("/user/sales", (req, res) => {
    
    console.log("This is the userID " + req.session.userID)

    pool.query("SELECT * FROM item WHERE userID=? ", [req.session.userID], (err, results) => {
        if (err) {
            console.log(err)
        }

        // console.log(results)

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


//Route for deleting posted sales item
router.post("/user/sales/delete", (req, res, next) => {
    var itemID= req.body.itemID
    console.log("item id is " + itemID)


    //Delete fucntion called
    pool.query("DELETE FROM item WHERE ITEMID=? ", [itemID], (err, results) => {
        if (err) {
            console.log(err)
        }

        console.log("Succesfully Deleted item")
    })

    res.redirect('/user/sales')
})







module.exports = router
