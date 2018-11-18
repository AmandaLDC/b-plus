const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
const urlPost = bodyParser.urlencoded({extended: true});
app.use(bodyParser.json());

const lista = require('./routes/lista');
const review = require('./routes/review');
const livro = require('./routes/livro');

app.use('/lista', lista);
app.use('/review', review);
app.use('/livro', livro);

app.listen(3000);
