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

app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html') //put the note on the html page
});

app.post('/api/notes', function (req, res) {
    var notes = (JSON.parse(fs.readFileSync(__dirname + '/db/db.json'))); // this is the data the client sent and it is going onto the html page

    notes.push({  // getting the number on notes and then subtracting one
        title: req.body.title,
        text: req.body.text,
        id: notes.length - 1
    });

    fs.writeFileSync(__dirname + '/db/db.json', JSON.stringify(notes)); // this will convery the the db/notes object to a string

    res.json(notes);// sending the notes as json to the client


});

app.delete('/api/notes/:id', function (req, res) {
    var notes = (JSON.parse(fs.readFileSync(__dirname + '/db/db.json')));
    const id = req.params.id;
    notes = notes.filter(function (note) {
        if (note.id == id) {
            return false;
        } else {
            return true;
        }
    });
    fs.writeFileSync(__dirname + '/db/db.json', JSON.stringify(notes));
    res.json(notes); // rewriting without the deleted note
});

app.listen(port, function () {  // This will activate the server
    console.log('App listening on port ' + port + '.');
});