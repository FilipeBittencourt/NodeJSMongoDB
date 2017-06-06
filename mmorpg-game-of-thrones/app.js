/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
app.listen(3003, function(){
	console.log('Servidor online... porta 3003');
});