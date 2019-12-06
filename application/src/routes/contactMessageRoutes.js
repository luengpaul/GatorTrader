const express = require('express'), router = express.Router()
const pool = require('../database/database')
const path = require('path')
const initCategories = require('../database/initCategories')

//Initializes categories of items for database
var categories = initCategories.init()
var globalItemId
const content = 'Please contact me'

router.post("/contactSeller", (req, res) => {
    console.log("This is the sender ID: "+ req.session.userID)
    var itemid = req.body.itemid
    globalItemId = itemid

    res.render('contactSeller', {
        searchResult: "",
        categories: categories,
        isLogin: req.session.loggedin
    })
  
})

router.post("/contact", (req, res) => {
    console.log("This is the sender ID: "+ req.session.userID)

    console.log("contact reached")
    if (message(req.session.email, req.body.phoneNumber, req.body.name, globalItemId,req.session.userID)) {
        req.flash('success_msg', 'Your message is sent ');
        res.redirect("/")

        console.log("contact intenrior reached")
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

async function message(email, phoneNumber, name, itemID, sender) {
    // const senderID = await getSenderID(email)
    const senderID = sender

    const recieverID = await getRecieverID(itemID)
    const newMessage = {
        phoneNumber: phoneNumber,
        senderID,
        recieverID,
        name: name,
        itemID: itemID
    }

    console.log(newMessage)

    pool.query('INSERT INTO gatortrader_test.message SET ?', newMessage, (err, rows, result) => {
        if (err) console.log(err)
    })
}


module.exports = router
