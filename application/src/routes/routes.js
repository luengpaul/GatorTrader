const express = require('express'), router = express.Router()
const db = require('../database')
const app=require('../app')

var types = db.initCategories()

var isLogin=app.isLogin

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
            isLogin: true
        })
    })
})

//Route for user dashboard page
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

//Route for contact seller page
router.get("/contactSeller", (req, res) => {
    //timeout necessary to get categories to appear before page is refreshed
    res.setTimeout(200, () => {
        res.render('contactSeller', {
            searchResult: "",
            categories: types,
            isLogin: isLogin
        })
    })
})


module.exports = router
