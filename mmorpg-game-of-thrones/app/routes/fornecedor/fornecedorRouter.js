module.exports = function (application) {
    application.get('/cadastro/fornecedor', (req, res) => {
        res.send('cadastro de fornecedor');
    });

    application.get('/lista/fornecedor', (req, res) => {
        res.send('lista de fornecedor');
    });
};
