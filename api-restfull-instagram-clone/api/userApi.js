module.exports = function (application) {
    application.get('/api/user', (req, res) => {
        application.src.controller.userController.userController(application, req, res, (err, result) => {
            if (err) {
                res.send(err);
                return;
            }
            res.send(result);
            return;
        });
    });
};
