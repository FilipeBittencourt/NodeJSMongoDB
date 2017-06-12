module.exports = function (application) {
    application.get('/aldeao', (req, res) => {
        application.app.controllers.aldeaoController.aldeaoView(application, req, res);
    });

    application.post('/ordenar-acao-aldeao', (req, res) => {
        application.app.controllers.aldeaoController.ordenarAcaoAldeaoController(application, req, res);
    });
};
