var express = require('express');
var app = express();
// vamos permitir acesso de qq lugar
var cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser');
var urlPost = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());

var lista = require('./routes/lista');
var review = require('./routes/review');

// As rotas get, post, put e delete de estudante deverão ser
// com /student
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/lista', lista);
app.use('/review', review);

app.listen(3000)
