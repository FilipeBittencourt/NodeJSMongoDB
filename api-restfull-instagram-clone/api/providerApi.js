module.exports = function (application) {
    application.get('/api/provider', (req, res) => {
        application.src.controller.providerControler.providerControler(application, req, res, (err, result) => {
            if (err) {
                res.send(err);
                return;
            }
            res.send(result);
            return;
        });
    });
};
