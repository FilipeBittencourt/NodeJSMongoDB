module.exports = function (application) {
    application.get('/cadastro', (req, res) => {
        application.app.controllers.cadastroController.cadastroView(application, req, res);
    });

    application.post('/cadastrar', (req, res) => {
        application.app.controllers.cadastroController.cadastrar(application, req, res);
    });
};
