/**
 * This module contains all the routes for the application
 *
 * Handles the routing and rendering of webpages.
 *
 * @author Alexander Beers.
 */

const express = require('express'), router = express.Router()
const initCategories = require('../database/initCategories')
const pool = require('../database/database')

//Initializes categories of items for database
var categories = initCategories.init()

//Route for Home Page
router.get("/", (req, res) => {
    //timeout necessary to get categories to appear before page is refreshed
    res.setTimeout(200, () => {
        //initialize homepage to show 8 most recent results
        pool.query("SELECT * FROM item WHERE approved = 1 ORDER BY date_upload DESC LIMIT 0, 8", (err, result) => {
            if (err) {
                console.log(err)
            }
            // console.log(result)
            res.render('home', {
                searchResult: result,
                categories: categories,
                isLogin: req.session.loggedin,
                feedbackMessage: "Recent posts on Gator Trader"
            })
        })
    })
})

//Route for posting form page
router.get("/postingForm", (req, res) => {
    //timeout necessary to get categories to appear before page is refreshed
    res.setTimeout(200, () => {
        res.render('postingForm', {
            itemName: "",
            description: "",
            price: 0.0,
            image: "",
            categories: categories,
            category: "",
            isLogin: req.session.loggedin
        })
    })
})

//Route for user dashboard pages
router.get("/user/messages", (req, res) => {
    if (req.session.loggedin) {
        res.render('userDashboardMessageTab', {
            searchResult: "",
            categories: categories,
            isLogin: req.session.loggedin
        })
    }
    else {
        res.send('You dont have access to this website');
    }
    res.end();
})
router.get("/user/sales", (req, res) => {
    if (req.session.loggedin) {
        res.render('userDashboardSalesItemTab', {
            searchResult: "",
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

// //Route for contact seller page
// router.get("/contactSeller", (req, res) => {
//     //timeout necessary to get categories to appear before page is refreshed
    
//         res.render('contactSeller', {
//             searchResult: "",
//             categories: categories,
//             isLogin: req.session.loggedin
//         })
// })

module.exports = router