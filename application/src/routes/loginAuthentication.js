/**
 * Handles user authentication using express-session module.
 *
 *Handles login and logout requests from clients.1
 *
 * @author Ibraheem Chaudry.
 */

const express = require('express'), router = express.Router()
const pool = require('../database/database')

router.post('/auth', function(request, response) {
	var email = request.body.email;
	var password = request.body.password;
	if (email && password) {
		pool.query('SELECT * FROM User WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.email = email;
			 	//request.flash('success_msg', 'You are logged in');
				response.redirect('/user');
			} else {
				//request.flash('error_msg', 'Incorrect Username and/or Password!')
				response.redirect('back');
			}
			//request.flash('error_msg', 'Incorrect Username and/or Password!')
			response.end();
		});
	} else {
		//request.flash('error_msg', 'Incorrect Username and/or Password!')
		response.end();
	}
});


router.post('/regis', function (request, response) {
	const {firstname, lastname, email, password, password2} = request.body;
		//TODO:check if email exists before 
		var createUser = {
			firstname: request.body.firstname,
			lastname: request.body.lastname,
			email: request.body.email,
			password: request.body.password,
			//password2: request.body.password2
		}
		// now the createStudent is an object you can use in your database insert logic.
		pool.query('INSERT INTO gatortrader_test.User SET ?', createUser, function (err, response) {
			if (err) throw err;			
		})
		request.session.loggedin = true;
		request.session.email = email;	
		return response.redirect('/user');
		})

router.get('/logout', function(req, res, next) {
	if (req.session) {
	 // delete session object
		//req.flash('success_msg', 'You are logged out')
		req.session.destroy(function(err) {
		if(err) {
		//	req.flash('error_msg', 'You are not logged out')
			return next(err);
		} else {
			  return res.redirect('/');
			}
	    });
	}
});
		

module.exports = router
