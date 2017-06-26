module.exports = function (application) {
    application.get('/api/provider', (req, res) => {
        application.src.controller.providerControler.providerControler(application, req, res);
    });
};
