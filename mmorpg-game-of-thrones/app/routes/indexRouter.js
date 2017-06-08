module.exports = function (application) {
    application.get('/', function (req, res) {
        application.app.controllers.indexController.indexView(application, req, res);
    });
}