const express = require('express')
const router = express.Router()
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

// //Route for posting form page
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

//Route for dashboard page
router.get('/userDashboard', (req, res) => {
    res.setTimeout(200, () => {
        res.render('userDashboard', {
            searchResult: "",
            categories: types,
            isLogin: isLogin
        })
    })
})





exports.index = function(req, res){
    var message = '';
    res.render('index',{message: message})};



module.exports = router
