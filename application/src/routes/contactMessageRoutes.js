const express = require('express'), router = express.Router()
const pool = require('../database/database')
const path = require('path')
const initCategories = require('../database/initCategories')

//Initializes categories of items for database
var categories = initCategories.init()
var globalItemId

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

    if (message(req.body.email, req.body.phoneNumber, req.body.name,  globalItemId)) {
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

async function message(email, phoneNumber , name, itemID) {
    const senderID = await getSenderID(email)
    const recieverID = await getRecieverID(itemID)
    const newMessage = {
        phoneNumber: phoneNumber,
        senderID,
        recieverID,
        name: name,
        itemID:itemID
    }

    console.log(newMessage)

    pool.query('INSERT INTO gatortrader_test.message SET ?', newMessage, (err, rows, result) => {
        if (err) console.log(err)
    })
}

module.exports = router
