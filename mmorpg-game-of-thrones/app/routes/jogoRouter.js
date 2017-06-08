module.exports = function (application) {
    application.get('/jogo', function (req, res) {
         application.app.controllers.jogoController.jogoView(application, req, res);
    });
}