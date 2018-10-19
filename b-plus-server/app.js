var express = require('express')
var app = express()
// vamos permitir acesso de qq lugar
var cors = require('cors')
app.use(cors())

var bodyParser = require('body-parser')
var urlPost = bodyParser.urlencoded({ extended: true })
app.use(bodyParser.json());

var student = require('./routes/exemplo');

// As rotas get, post, put e delete de estudante deverão ser
// com /student
app.use('/student', student);

app.listen(3000)
