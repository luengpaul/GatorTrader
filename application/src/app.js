const express = require('express')
const app = express()
const path = require('path')
const mysql = require('mysql')

//allows server of static files (such as css files) to work with nodejs
app.use(express.static(path.join(__dirname, 'public')));

var db = mysql.createConnection({
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
    //test
    db.query("SELECT * FROM User", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    })
    db.end()
});

//routes
app.get("/", (req, res) => {
  // res.sendFile(path.join('../views/about.html'))
    res.sendFile(path.join(__dirname, '/views', 'about.html'))


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

app.listen(3000, () => console.log('Server running on port 3000'))