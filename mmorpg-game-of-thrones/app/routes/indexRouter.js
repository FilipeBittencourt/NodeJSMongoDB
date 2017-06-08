module.exports = function (application) {
    application.get('/', (req, res) => {
        application.app.controllers.indexController.indexView(application, req, res);
    });
};
