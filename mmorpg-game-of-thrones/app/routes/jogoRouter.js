module.exports = function (application) {
    application.get('/jogo', (req, res) => {
         application.app.controllers.jogoController.jogoView(application, req, res);
    });
};
