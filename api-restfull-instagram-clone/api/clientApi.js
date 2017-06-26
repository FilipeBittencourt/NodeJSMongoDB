module.exports = function (application) {
    application.get('/api/client', (req, res) => {
        application.src.controller.clientController.clientController(application, req, res, (err, result) => {
            if (err) {
                res.send(err);
                return;
            }
            res.send(result);
            return;
        });
    });
};
