var express = require("express"); // file to get expess
var fs = require('fs'); // node module to read file
var app = express(); // express package
var port = process.env.PORT || 3000 // the port to host the website on heruku

app.use(express.json())
    .use(express.urlencoded({ extended: false })); // reads the body and and puts express  in a json format

app.use(express.static('public')); //  this holds the public html and css files within the express.js framework


app.get('/notes', function (req, res) {
    res.sendFile(__dirname + '/public/notes.html'); //sends the notes html to the client through the notes route

});
app.get('/api/notes', function (req, res) {
    res.json(JSON.parse(fs.readFileSync(__dirname + '/db/db.json'))); // turn the string into an object and gets the  db rray values to  an object
});

app.get('/*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html') //put the note on the html page through the html route
});
app.post('/api/notes', function (req, res) {
    var notes = (JSON.parse(fs.readFileSync(__dirname + '/db/db.json'))); // this is the data the client sent and it is going onto the  and notes page route as an object

    notes.push({  //  notes pushed onto the page whether added or deleted
        title: req.body.title,
        text: req.body.text,
        id: notes.length - 1
    });

    fs.writeFileSync(__dirname + '/db/db.json', JSON.stringify(notes)); // this will convert the the db/notes object to a string

    res.json(notes);// sending the notes as json to the client


});


app.delete('/api/notes/:id', function (req, res) { // the node  function which will delete  the notes through the notes route
    var notes = (JSON.parse(fs.readFileSync(__dirname + '/db/db.json'))); //variable which will turn the notes into an object
    const id = req.params.id; // id variable
    notes = notes.filter(function (note) { // function which will filter out the selected dleeted notes
        if (note.id == id) {
            return false;
        } else {
            return true;
        }
    });
    fs.writeFileSync(__dirname + '/db/db.json', JSON.stringify(notes)); // updated  deleted file will be converted to a string
    res.json(notes); // rewriting without the deleted note in json format
});




app.listen(port, function () {  // This will activate the server
    console.log('App listening on port ' + port + '.');
});


