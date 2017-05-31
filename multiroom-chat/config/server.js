/* módulos*/
const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

/* Start objeto express*/
const app = express();

/* Set das variaveis de 'views engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/*Middleware*/
app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

/*consign - Auto load das rotas, models e controllers */
consign().include('app/routes')    
    .then('app/models')
    .then('app/controllers')
    .into(app);

module.exports = app;