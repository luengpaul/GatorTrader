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

app.get("/team/person1", (req, res) => {
  res.sendFile(path.join(__dirname, 'views/team', '/person1.html'))
})

app.get("/team/person2", (req, res) => {
  res.sendFile(path.join(__dirname, 'views/team', '/person2.html'))
})

app.get("/team/person3", (req, res) => {
  res.sendFile(path.join(__dirname, 'views/team', '/person3.html'))
})

app.get("/team/person4", (req, res) => {
  res.sendFile(path.join(__dirname, 'views/team', '/person4.html'))
})

app.get("/team/person5", (req, res) => {
  res.sendFile(path.join(__dirname, 'views/team', '/person5.html'))
})

app.get("/team/person6", (req, res) => {
  res.sendFile(path.join(__dirname, 'views/team', '/person6.html'))
})

app.listen(3000, () => console.log('Server running on port 3000'))