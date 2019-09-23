const express = require('express')
const app = express()
const path= require('path')


//allows server of static files (such as css files) to work with nodejs
app.use(express.static(path.join(__dirname, 'public')));

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