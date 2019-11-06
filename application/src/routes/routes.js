const express = require('express')
const router = express.Router()
const mysql = require('mysql')

var db = mysql.createConnection({
    host: 'gatortrader.cdnacoov8a86.us-west-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: 'csc648_team10',
    //working database name, actual database is 'gatortrader'
    database: 'gatortrader_test'
})
db.connect(function (err) {
    if(err) throw err
})

var types = []
db.query("SELECT * FROM category", (err, result) => {
    if (err) {
        console.log(err)
    } else {
        if (types.length == 0) {
            for (let i = 0; i < result.length; i++) {
                types.push(result[i].type)
            }
        }
    }
})

router.get("/", (req, res) => {
    //necessary to get categories to appear before page is refreshed
    res.setTimeout(500, () => {
        res.render('home', {
            searchResult: "",
            categories: types
        })
    })
})

module.exports = router