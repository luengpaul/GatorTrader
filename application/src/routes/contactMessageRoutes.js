const express = require('express'), router = express.Router()
const pool = require('../database/database')
const path = require('path')
const initCategories = require('../database/initCategories')

//Initializes categories of items for database
var categories = initCategories.init()
var globalItemId
const content = 'Please contact me'

// function createTimeStamp () {
//     var newDate = new Date()
//     var month = newDate.getMonth()
//     var date = newDate.getDate()
//     var year = newDate.getFullYear()
//     var hours = newDate.getHours()
//     var amOrPm = 'am'
//     if (hours > 12) {
//       hours = hours - 12
//       amOrPm = 'pm'
//     }
//     var minutes = newDate.getMinutes()
//     if (minutes < 10) {
//       minutes = '0' + minutes
//     }
//     var calDate = month + '-' + date + '-' + year
//     var time = hours + ':' + minutes + ' ' + amOrPm
//     return calDate + '  ' + time
//   }

router.post("/contactSeller", (req, res) => {
    var itemid = req.body.itemid
    globalItemId = itemid

    res.render('contactSeller', {
        searchResult: "",
        categories: categories,
        isLogin: req.session.loggedin
    })

})

router.post("/contact", (req, res) => {

    if (message(req.body.email, globalItemId, content)) {
        req.flash('success_msg', 'Your message is sent ');
        res.redirect("/")
    }

})


function getSenderID(email) {
    return new Promise(resolve => {
        pool.query('SELECT userID FROM User WHERE email = ?', [email], function (error, result, fields) {
            if (error) console.log(error)
            if (result[0]) {
                var userID = result[0].userID
                resolve(userID)

            }
        })
    })
}

function getRecieverID(itemID) {
    return new Promise(resolve => {
        pool.query('SELECT userID FROM item WHERE itemID = ?', [itemID], function (error, result, fields) {
            if (error) console.log(error)

            if (result[0]) {
                var userID = result[0].userID
                resolve(userID)
            }
        })
    })
}

async function message(email, globalItemId, content) {
    const senderID = await getSenderID(email)
    const recieverID = await getRecieverID(globalItemId)
    const newMessage = {
        contents: content,
        recieverID,
        senderID
    }
    pool.query('INSERT INTO gatortrader_test.message SET ?', newMessage, (err, rows, result) => {
        if (err) console.log(err)
    })
}

module.exports = router
