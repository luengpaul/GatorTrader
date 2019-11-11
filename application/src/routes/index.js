// const express = require('express');
// const router = express.Router();
// const {ensureAuthenticated} = require('../config/auth');
// //home page
// router.get('/', (req, res) => res.render('home'));
//
// //dashboard
// router.get('/dashboard', ensureAuthenticated, (req, res) =>
//     res.render('dashboard',{
//         username: req.user.username
//     }));
//
// exports.index = function(req, res){
//     var message = '';
//     res.render('index',{message: message})};
// module.exports = router;