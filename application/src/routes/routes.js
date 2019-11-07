const express = require('express'), router = express.Router()
const db = require('../database')

var types = db.initCategories()

router.get("/", (req, res) => {
    //timeout necessary to get categories to appear before page is refreshed
    res.setTimeout(200, () => {
        res.render('home', {
            searchResult: "",
            categories: types
        })
    })
})

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
