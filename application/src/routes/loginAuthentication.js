/**
 * Handles user authentication using express-session module.
 *
 *Handles login and logout requests from clients.1
 *
 * @author Ibraheem Chaudry.
 */

const express = require('express'), router = express.Router()
const pool = require('../database/database')


//User authentication function handles login requests for clients
router.post('/auth', function(request, response) {
	var email = request.body.email;
	var password = request.body.password;
	if (email && password) {
		pool.query('SELECT * FROM User WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.email = email;
				response.redirect('/user');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

//Debug code
// router.get('/user', function(request, response) {
// 	if (request.session.loggedin) {
// 		response.send('Welcome back, ' + request.session.firstname + '!');
// 	} else {
// 		response.send('Please login to view this page!');
// 	}
// 	response.end();
// });


//Route for logging out
router.get('/logout', function(req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  });

module.exports = router;
