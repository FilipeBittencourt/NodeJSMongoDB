module.exports = function (application) {
    application.get('/api/user', (req, res) => {
        application.src.controller.userController.userController(application, req, res);
    });
};
