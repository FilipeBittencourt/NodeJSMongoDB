module.exports = function (application) {
    application.get('/api/client', (req, res) => {
        application.src.controller.clientController.clientController(application, req, res);
    });
};
