/**
 * Handles posting form post routes and uploading post fields to database item table
 *
 *
 * @author Alexander Beers.
 */

const express = require('express'), router = express.Router()
const initCategories = require('../database/initCategories')
const pool = require('../database/database')
const multer = require('multer')
const path = require('path')

var categories = initCategories.init()

//image handling: adds user post images to "public/post_images" if they are a valid data type
var storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, path.join(__dirname, "../public/post_images")) },
    filename: (req, file, cb) => {
        //checks for valid file types
        if (file.mimetype === 'image/jpg') {
            cb(null, file.fieldname + '-' + Date.now() + ".jpg")
        }
        else if (file.mimetype === 'image/jpeg') {
            cb(null, file.fieldname + '-' + Date.now() + ".jpeg")
        }
        else if (file.mimetype === 'image/png') {
            cb(null, file.fieldname + '-' + Date.now() + ".png")
        }
        else if (file.mimetype !== 'image/jpeg' || file.mimetype !== 'image/jpg' || file.mimetype !== 'image/png') {
            return cb(new Error('Only .png, .jpg and .jpeg format files allowed.'))
        }
    }
})
const upload = multer({ storage: storage })

router.post('/postingform', upload.single('img'), (req, res) => {
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
    postUpload(req.session.email, req.body.name, req.body.description, req.body.price, req.body.category, req.file.filename)
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


