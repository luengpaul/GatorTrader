const express = require('express'), app = express();
const path = require('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const aboutRoutes = require('./routes/aboutPgRoutes');
const db = require('./database');

//image handling: adds user post images to "public/post_images" if they are a valid data type
const multer = require("multer");
var storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, "public/post_images"); },
    filename: (req, file, cb) => {
        //checks for valid file types
        if (file.mimetype === 'image/jpeg') {
            cb(null, file.fieldname + '-' + Date.now() + ".jpg");
        }
        else if (file.mimetype === 'image/jpg') {
            cb(null, file.fieldname + '-' + Date.now() + ".jpeg");
        }
        else if (file.mimetype === 'image/png') {
            cb(null, file.fieldname + '-' + Date.now() + ".png");
        }
        else if (file.mimetype !== 'image/jpeg' || file.mimetype !== 'image/jpg' || file.mimetype !== 'image/png') {
            return false;
        }
    }
});
const upload = multer({storage: storage});

try {
    var dbConnection = db.connection();
} catch (err) {
    console.log(err);
}

//configures ejs as templating language
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//add middleware layers required for application (static file serving, etc)
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', routes);
app.use('/', aboutRoutes);

var categories = db.initCategories();
var showRecentPosts = true;

//used for test post that gets value from the protype homepage search bar
app.post('/', (req, res) => {
    console.log("value returned from search entry is (" + req.body.searchEntry + ")");

    //if category was selected output all items for that category
    if(categories.includes(req.body.searchEntry)) {
            dbConnection.query("SELECT * FROM item WHERE category=?", [req.body.searchEntry], (err, result) => {
            if (err) {
                console.log(err)
            } 
            res.render('home', {
                searchResult: result,
                categories: categories,
                isLogin: true,
                feedbackMessage: ""
            })
        })
    }
    //if search is hit on empty searchbar display 8 most recent items again
    else if (!req.body.searchEntry) {
        dbConnection.query("SELECT * FROM item ORDER BY date_upload DESC LIMIT 0, 8", (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log(result)
            }
            res.render('home', {
                searchResult: result,
                categories: categories,
                isLogin: true,
                feedbackMessage: "Recent Posts on Gatortrader"
            })
        })
    } else {
        //else only output the item that the user entered
        dbConnection.query("SELECT * FROM item WHERE name like '%" + req.body.searchEntry+ "%'", (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log(result)
            }
            res.render('home', {
                searchResult: result,
                categories: categories,
                isLogin: true,
                feedbackMessage: ""
            })
        })
    }
})

app.post('/postingform', upload.single('img'), (req, res) => {
    console.log("--- Post Entry --- ");
    console.log("itemName: " + req.body.itemName);
    console.log("description: " + req.body.description);
    console.log("price: " + req.body.price);
    console.log("category: " + req.body.category);
    console.log("picture: " + req.body.picture); //filename 
    //console.log("meeting_location: " + req.body.meeting_location);
    console.log("------------------");
    
    //testing image upload
    if(!req.file) {
        console.log("No image received");
    } else {
        console.log('Image recieved');
    }
    console.log("image filename: " + req.file.filename)
    //--------------

    //TODO: include imagePath attribute and meeting location, prevent duplicate posts and handle wrong filetypes      
    dbConnection.query("INSERT INTO item (name, description, price, category, picture) VALUES (?,?,?,?,?)",
    [req.body.itemName, req.body.description, req.body.price, req.body.category, req.file.filename], (err, rows, result) => {
       if (err) console.log(err);

    })
 
    res.render('home', {
        searchResult: "",
        categories: categories,
        isLogin: true,
        feedbackMessage: "Post successfully submitted! Item will appear on site pending administrator approval."
    })     
})

const PORT = 3000

app.listen(PORT, () => console.log('Server running on port ' + PORT))