module.exports = function (application) {
    application.get('/cadastro/cliente', (req, res) => {
        res.send('cadastro de cliente');
    });

    application.get('/lista/cliente', (req, res) => {
        res.send('lista de cliente');
    });
};
