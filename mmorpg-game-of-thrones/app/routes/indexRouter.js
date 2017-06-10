module.exports = function (application) {
    application.get('/', (req, res) => {
        application.app.controllers.indexController.indexView(application, req, res);
    });
    application.post('/autenticar', (req, res) => {
        application.app.controllers.autenticacaoController.autenticacaoController(application, req, res);
    });
};
