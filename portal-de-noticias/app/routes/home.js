module.exports = function (application) {
    application.get('/', (req, res) => {
        application.app.controllers.homeControllers.index(application, req, res);
    });
};
