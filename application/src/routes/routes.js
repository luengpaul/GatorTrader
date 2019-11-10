const express = require('express'), router = express.Router()
const db = require('../database')

try {
    var dbConnection = db.connection();
} catch (err) {
    console.log(err);
}
var types = db.initCategories()

//temporary set for testing
var isLogin= true
router.get("/img", (req, res) => {
    res.render('img', {
    })
});
//Route for Home Page
router.get("/", (req, res) => {
    //timeout necessary to get categories to appear before page is refreshed
    res.setTimeout(200, () => {
        //initialize homepage to show 8 most recent results
        dbConnection.query("SELECT * FROM item ORDER BY date_upload DESC LIMIT 0, 8", (err, result) => {
            if (err) {
                console.log(err)
            }
            res.render('home', {
                searchResult: result,
                categories: types,
                isLogin: isLogin,
                feedbackMessage: "Recent Posts on Gatortrader"
            })
        })
    })
})

//Route for posting form page
router.get("/postingForm", (req, res) => {
    res.setTimeout(200, () => {
        res.render('postingForm', {
            itemName: "",
            description: "",
            price: 0.0,
            image: "",
            categories: types,
            category: "",
            isLogin: true
        })
    })
})

//Route for posting form page
router.get("/user", (req, res) => {
    res.setTimeout(200, () => {
        res.render('userDashboard', {
            searchResult: "",
            categories: types,
            isLogin: isLogin
        })
    })
})



module.exports = router
