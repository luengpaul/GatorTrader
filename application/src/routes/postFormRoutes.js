/**
 * Handles posting form post routes and uploading post fields to database item table
 *
 *
 * @author Alexander Beers.
 */

const express = require('express'), router = express.Router()
const pool = require('../database/database')
const multer = require('multer')
const sharp=require('sharp')
const storage = require('./upload-config')
const upload = multer(storage)
const fs=require('fs')
const path = require('path')


router.post('/postingform', upload.single('image'), async (req, res) => {
    const { filename: image } = req.file
   
    await sharp(req.file.path)
    .resize(500)
    .jpeg({quality: 50})
    .toFile(
        path.resolve(req.file.destination,'resized',image)
    )
    fs.unlinkSync(req.file.path)

    console.log("--- Post Entry --- ");
    console.log("itemName: " + req.body.itemName);
    console.log("description: " + req.body.description);
    console.log("price: " + req.body.price);
    console.log("category: " + req.body.category);
    //console.log("picture: " + req.body.picture); //filename 
    console.log("image filename: " + req.file.filename)
    //console.log("meeting_location: " + req.body.meeting_location);
    console.log("------------------");
 
    if (req.fileValidationError) {
        return res.end(req.fileValidationError);
    }

    //synchronously gets userID of user that posted and then creates a database record from all the postform values
    postUpload(req.session.email, req.body.itemName, req.body.description, req.body.price, req.body.category, req.file.filename)
    res.redirect('back')
})

function getUserID(email) {
    return new Promise(resolve => {
        pool.query("SELECT userID FROM User WHERE email = ?", [email], (err, rows, result) => {
            var userID = 0
            if (rows[0]) {
                var userID = rows[0].userID
                resolve(userID)
            }        
        })
    })     
}

async function postUpload(email, name, description, price, category, file) {
    const userID = await getUserID(email)
    pool.query("INSERT INTO item (userID, name, description, price, category, picture) VALUES (?,?,?,?,?,?)",
        [userID, name, description, price, category, file], (err, rows, result) => {
            if (err) console.log(err)
        })
}

module.exports = router
