const express = require('express'), app = express()
const path = require('path')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const session= require('express-session')
const randomstring = require("randomstring")
var cookieSession = require('cookie-session')
const routes = require('./routes/routes')
const loginAuth=require('./routes/loginAuthentication')
const search= require('./routes/searchFunction')
const aboutRoutes = require('./routes/aboutPgRoutes')
const db = require('./database')


//configures ejs as templating language
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//Using cookie-sessions
// app.set('trust proxy', 1);
// app.use(cookieSession({
//                     name: 'session'
//                     , secret: randomstring.generate()
//                     , httpOnly: true
//                     , maxAge: 30 * 60 * 1000
//                     , secure: false
//                     , overwrite: false
//               }));

//add middleware layers required for application (static file serving, etc)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', routes)
app.use('/', loginAuth)
app.use('/', search)
app.use('/', aboutRoutes)
// app.use('/session', session);

const PORT = 3000

app.listen(PORT, () => console.log('Server running on port ' + PORT))

