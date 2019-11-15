const express = require('express'), router = express.Router()
const db = require('../database')


var categories = db.initCategories()

//Route for Home Page
router.get("/", (req, res) => {
    //timeout necessary to get categories to appear before page is refreshed
    res.setTimeout(200, () => {
        res.render('home', {
            searchResult: "",
            categories: categories,
            isLogin: req.session.loggedin
        })
    })
})

//Route for posting form page
router.get("/postingForm", (req, res) => {
    //timeout necessary to get categories to appear before page is refreshed
    res.setTimeout(200, () => {
        res.render('postingForm', {
            searchResult: "",
            categories: categories,
            isLogin: req.session.loggedin
        })
    })
})

//Route for user dashboard page
router.get("/user", (req, res) => {
    if (req.session.loggedin) {
        res.render('userDashboard', {
            searchResult: "",
            categories: categories,
            name: req.session.email,
            isLogin: req.session.loggedin
        })
}
else{
    res.send('You dont have access to this website');
}
res.end();
})

//Route for contact seller page
router.get("/contactSeller", (req, res) => {
    //timeout necessary to get categories to appear before page is refreshed
    res.setTimeout(200, () => {
        res.render('contactSeller', {
            searchResult: "",
            categories: categories,
            isLogin: req.session.loggedin
        })
    })
})


module.exports = router
