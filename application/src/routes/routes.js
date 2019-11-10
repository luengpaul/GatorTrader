const express = require('express'), router = express.Router()
const db = require('../database')

var types = db.initCategories()

//This variable temporarily init to true is passed to pages so navbar can be dynamically updated
var isLogin= true

//Route for Home Page
router.get("/", (req, res) => {
    //timeout necessary to get categories to appear before page is refreshed
    res.setTimeout(200, () => {
        res.render('home', {
            searchResult: "",
            categories: types,
            isLogin: isLogin
        })
    })
})

//Route for posting form page
router.get("/postingForm", (req, res) => {
    //timeout necessary to get categories to appear before page is refreshed
    res.setTimeout(200, () => {
        res.render('postingForm', {
            searchResult: "",
            categories: types,
            isLogin: isLogin
        })
    })
})

//Route for posting form page
router.get("/user", (req, res) => {
    //timeout necessary to get categories to appear before page is refreshed
    res.setTimeout(200, () => {
        res.render('userDashboard', {
            searchResult: "",
            categories: types,
            isLogin: isLogin
        })
    })
})

//Route for results page
router.get("/results", (req, res) => {
    //timeout necessary to get categories to appear before page is refreshed
    res.setTimeout(200, () => {
        res.render('results', {
            searchResult: "",
            categories: types,
            isLogin: isLogin
        })
    })
})




module.exports = router
