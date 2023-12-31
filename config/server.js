const express = require('express');
const expressSession = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(express.static(__dirname + '/../public'));

app.use(expressSession({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(3000, () => {
    console.log('Servidor rodando');
})

module.exports = app;