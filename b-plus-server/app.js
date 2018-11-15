var express = require('express');
var app = express();
var cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser');
var urlPost = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());

var lista = require('./routes/lista');
var review = require('./routes/review');
var livro = require('./routes/livro');

app.use('/lista', lista);
app.use('/review', review);
app.use('/livro', livro);

app.listen(3000);
