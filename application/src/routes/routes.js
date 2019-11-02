const express = require('express')
const router = express.Router()
//var path = require('path')

router.get("/", (req, res) => {
    //res.sendFile(path.join(__dirname, '/views', 'home.html'))
    res.render('home', {
        searchResult: "",
        categories: ""
    })
})

module.exports = router