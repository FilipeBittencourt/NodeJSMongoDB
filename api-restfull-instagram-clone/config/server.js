const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const expressSession = require('express-session');

const app = express();
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(expressValidator());

/* config the middleware express-session */
app.use(expressSession({
    secret: '123D3Ol1v31rA4',
    resave: Boolean,
    saveUninitialized: Boolean
}));

/* Autoload */
consign()
    .include('api')
    //.then('src/model')
    .then('src/controller')
    .into(app);


app.listen(3004, () => {
	console.log('Server online... port 3004');
});


app.use((req, res, next) => {
    res.status(404).send('Page not found');
    next();
});

app.use((err, req, res, next) => {
    res.status(500).send('Ops! Internal server, sorry about!');
    next();
});


module.exports = app;
