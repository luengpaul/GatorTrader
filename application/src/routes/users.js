const db = require('../database')
const express = require('express')
const router = express.Router()
var types = db.initCategories()
try {
    var dbConnection = db.connection()
} catch (err) {
    console.log(err)
}

router.post('/register', (req, res) => {
    const { firstname, lastname, email, password} = req.body;

    var createUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
       
    }

    console.log(createUser)
    // now the createStudent is an object you can use in your database insert logic.
    dbConnection.query('INSERT INTO gatortrader_test.User SET ?', createUser, function (err, resp) {
        if (err) throw err;
    });

    //temporarily redirects to generic dashboard 
    res.redirect('/userDashboard')
})

//Login handle 
router.post('/login', (req, res, next) => {
    //temporary redirect
    res.redirect('../');
    /*
    var loginSuccess=false
    dbConnection.query("SELECT EXISTS(SELECT * FROM User WHERE email=? AND password=?)", [req.body.email, req.body.password], (err, res) => {
        if (err) throw err;

        //TODO if success get userID of logged in user, for now simulate login
        console.log(res[0])
        if (res[0] == 1) {
            loginSuccess = true
            console.log(loginSuccess)
        }
    });
    if (loginSuccess)
        res.redirect('/users/login');*/
});

//Logout handle
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('../');
});

module.exports = router