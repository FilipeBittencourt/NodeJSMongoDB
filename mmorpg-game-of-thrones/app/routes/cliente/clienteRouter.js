module.exports = function (application) {
    application.get('/cliente/cadastrar', (req, res) => {
        res.send('cadastro de cliente');
    });

    application.get('/lista/cliente', (req, res) => {
        res.send('lista de cliente');
    });

    application.get('/editar/cliente', (req, res) => {
        res.send('editar cliente');
    });
    
};
