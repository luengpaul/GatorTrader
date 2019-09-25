//const http = require("http");
const express = require("express");
const app = express();
const path = require('path');
//const mysql = require("mysql");
//const fs = require("fs");

const PORT = 3000;

//routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/about.html'));
});

app.get("/person1", (req, res) => {
    res.sendFile(path.join(__dirname + '/person1.html'));
});

app.get("/person2", (req, res) => {
    res.sendFile(path.join(__dirname + '/person2.html'));
});

app.get("/person3", (req, res) => {
    res.sendFile(path.join(__dirname + '/person3.html'));
});

app.get("/person4", (req, res) => {
    res.sendFile(path.join(__dirname + '/person4.html'));
});

app.get("/person5", (req, res) => {
    res.sendFile(path.join(__dirname + '/person5.html'));
});

app.get("/person6", (req, res) => {
    res.sendFile(path.join(__dirname + '/person6.html'));
});

//listen for http request
app.listen(PORT, (err) => { 
    if (err) throw err;
    console.log("Server is running");
});