/* importar o módulo do framework express */
const express = require('express');

/* importar o módulo do consign */
const consign = require('consign');

/* importar o módulo do body-parser */
const bodyParser = require('body-parser');

/* importar o módulo do express-validator */
const expressValidator = require('express-validator');

/* importar o módulo do express-session */
const expressSession = require('express-session');

/* iniciar o objeto do express */
const app = express();

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.json({ limit: '10mb' }));

/* configurar o middleware express-validator */
app.use(expressValidator());

/* configurar o middleware express-session */
app.use(expressSession({
    secret: '123D3Ol1v31rA4',
    resave: Boolean,
    saveUninitialized: Boolean
}));

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
    .include('app/routes')
    .then('config/dbConnection.js') // Especificar o arquivo, se não entenderá que é um diretório.
    .then('app/models')
    .then('app/controllers')
    .into(app);

/* parametrizar a porta de escuta */
app.listen(3003, () => {
	console.log('Servidor online... porta 3003');
});

/* configurar o middleware erros das paganias ou msg de status */
app.use((req, res, next) => {
    res.status(404).send('Página não encontrada');
    next();
});

/* configurar o middleware erros do SERVER ou msg de status */
app.use((err, req, res, next) => {
    res.status(500).send('Ops! Houve um erro interno.');
    next();
});

/* exportar o objeto app */
module.exports = app;
