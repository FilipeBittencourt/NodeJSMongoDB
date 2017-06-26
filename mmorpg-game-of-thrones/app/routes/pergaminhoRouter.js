module.exports = function (application) {
    application.get('/pergaminho', (req, res) => {
        application.app.controllers.pergaminhoController.pergaminhoBuscar(application, req, res);
    });
};
