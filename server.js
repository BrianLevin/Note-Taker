var express = require("express");
var fs = require('fs');
var app = express();
var port = process.env.PORT || 3000;


app.use(express.json())
    .use(express.urlencoded({ extended: false }));

app.use(express.static('public'));