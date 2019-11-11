//import * as db from "../database";
const db = require('../database')
const express = require('express')
const router = express.Router()
var types = db.initCategories()
try {
    var dbConnection = db.connection()
} catch (err) {
    console.log(err)
}
// Login Page
router.get('/login', (req, res) => res.render('Login'));
// Register Page
router.get('/register', (req, res) => res.render('Register'));

router.post('/register', (req, res) => {

    const {firstname, lastname, email, password, password2} = req.body;
    let errors = [];
    //check required field
    if (!firstname || !lastname || !email || !password || !password2) {
        errors.push({msg: 'Please fill in all fields'});
    }
    //Check password match
    if (password !== password2) {
        errors.push({msg: 'Passwords do not match'})
    }

    //Check password length
    if (password.length < 6) {
        errors.push({msg: 'Password should be at least 6 characters'});
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            firstname,
            lastname,
            email,
            password
        });
    } else {
        //TODO:check if email exists before creating a new user
        console.log("Pass");
        var createUser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            //password2: req.body.password2
        }
console.log(createUser)
        // now the createStudent is an object you can use in your database insert logic.
        dbConnection.query('INSERT INTO gatortrader_test.User SET ?', createUser, function (err, resp) {
            if (err) throw err;
        });
        res.redirect('/users/login')
    }
})
//Login handle ]]
router.post('/login', (req, res, next) => {
    res.redirect('/userDashboard')
    console.log("request" + req)
    return next()
});

//Logout handle
router.get('/logout', (req, res) => {
    req.logout();
    // req.flash('success_msg', ' You are logged out');
    res.redirect('/users/login');
});

module.exports = router
