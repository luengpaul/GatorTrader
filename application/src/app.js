const express = require('express')
const app = express()
const path = require('path')
const mysql = require('mysql')
const bodyParser = require('body-parser')

//allows server of static files (such as css files) to work with nodejs
app.use(express.static(path.join(__dirname, '/public')));
//allows paring incoming request bodies in a middleware before handlers
app.use(bodyParser.urlencoded({ extended: true })); 
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs'); 
//changed to const 
const db = mysql.createConnection({
    host: 'gatortrader.cdnacoov8a86.us-west-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: 'csc648_team10',
    //working database name, actual database is 'gatortrader'
    database: 'gatortrader_test' 
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    db.query('gatortrader_test');
});
if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
} 

//routes
app.get("/", (req, res) => {
    //res.sendFile(path.join(__dirname, '/views', 'prototypeHome.html'))
    res.render('prototypeHome', { searchResult: ""})
})

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', '/about.html'))
})

app.get("/team/ibraheem", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/team', '/ibraheem.html'))
})

app.get("/team/tom", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/team', '/tom.html'))
})

app.get("/team/alexander", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/team', '/alexander.html'))
})

app.get("/team/lance", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/team', '/lance.html'))
})

app.get("/team/paul", (req, res) => {
   res.sendFile(path.join(__dirname, 'views/team', '/paul.html'))
})

app.get("/team/saleh", (req, res) => {
    res.sendFile(path.join(__dirname, 'views/team', '/saleh.html'))
})


//used for test post that gets value from the protype homepage search bar
app.post('/grabValTest', function (req, res) { 
    console.log(req.body.searchEntry)
    if (!db._connectCalled) {
        db.connect();
    }
    db.query("SELECT * FROM item WHERE name=?", [req.body.searchEntry], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
        res.render('prototypeHome', {
            searchResult: result
        })
    })
})

function search (req, res, next){
    //user search term 
    var searchTerm = req.query.search;
    //user setected category 
    var category = req.query.category; 

    let query = 'SELECT * FROM item';
    if(searchTerm != ' ' && category != ' '){
        query = `SELECT * FROM item WHERE Category = '` + category + '` AND (Name LIKE `%' + searchTerm + '%` OR Comment LIKE `%' + searchTerm +'%`)';

    }
    else if(searchTerm != ' ' && category != ' '){
         query = 'SELECT * FROM item WHERE Name LIKE `%' + searchTerm + `%' OR CommentLIKE'%` + searchTerm+`%'`;
    }
    else if(searchTerm == ' ' && category == ' '){
        query = `SELECT * FROM item WHERE Category = ' ` + category + `'`;
    }
    db.query(query, (err,result) => {
        if(err){
            req.searchResult = ""; 
            req.searchTerm = ""; 
            req.category= "";
            next();
        }
        req.searchResult = result; 
        req.searchTerm = searchTerm; 
        req.category= "";
        next();

    });
}

.get('/example', search, (req,res) =>{
    var searchResult = req.searchResult;
    res.render('pages/example' ,{
        results: searchResult.length,
        searchTerm: req.searchTerm,
        searchResult: searchResult, 
        category : req.category
    });
}
)

































































const PORT = 3000
app.listen(PORT, () => console.log('Server running on port ' + PORT))