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

var categories = initCategories.init()

//image handling: adds user post images to "public/post_images" if they are a valid data type
var storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, "./public/post_images"); },
    filename: (req, file, cb) => {
        //checks for valid file types
        if (file.mimetype === 'image/jpeg') {
            cb(null, file.fieldname + '-' + Date.now() + ".jpg")
        }
        else if (file.mimetype === 'image/jpg') {
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
    console.log("picture: " + req.body.picture); //filename 
    console.log("image filename: " + req.file.filename)
    //console.log("meeting_location: " + req.body.meeting_location);
    console.log("------------------");

    if (req.fileValidationError) {
        return res.end(req.fileValidationError);
    }
  
    //TODO: associate user to the post and include userID in query below using req.session.email 
    pool.query("INSERT INTO item (name, description, price, category, picture) VALUES (?,?,?,?,?)",
        [req.body.itemName, req.body.description, req.body.price, req.body.category, req.file.filename], (err, rows, result) => {
        if (err) console.log(err)
    })

    //temporary renders dashboard after successful post, change to displaying successful post modal later
    res.render('userDashboardMessageTab', {
        searchResult: "",
        categories: categories,
        isLogin: req.session.loggedin
        //feedbackMessage: "Post successfully submitted! Item will appear on site pending administrator approval."
    })
})

module.exports = router