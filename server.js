var express = require("express");
var fs = require('fs');
var app = express();
var port = process.env.PORT || 3000;


app.use(express.json())
    .use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

app.get('/notes', function (req, res) {
    res.sendFile(__dirname + '/public/notes.html');

});

app.get('/api/notes', function (req, res) {
    res.json(JSON.parse(fs.readFileSync(__dirname + '/db/db.json'))); // turn the string into an object
});