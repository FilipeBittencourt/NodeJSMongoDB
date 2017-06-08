/* importar as configurações do servidor */
const app = require('./config/server');

/* parametrizar a porta de escuta */
app.listen(3003, () => {
	console.log('Servidor online... porta 3003');
});
