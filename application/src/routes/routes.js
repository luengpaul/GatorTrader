const express = require('express'), router = express.Router()
const db = require('../database')

var types = db.initCategories()


//Route for Home Page
router.get("/", (req, res) => {
    //timeout necessary to get categories to appear before page is refreshed
    res.setTimeout(200, () => {
        res.render('home', {
            searchResult: "",
            categories: types
        })
    })
})

//Route for posting form page
router.get("/postingForm", (req, res) => {
    //timeout necessary to get categories to appear before page is refreshed
    res.setTimeout(200, () => {
        res.render('postingForm', {
            searchResult: "",
            categories: types
        })
    })
})



module.exports = router
